import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { toJSON } from "../../utils";

interface Env {
  DB: D1Database;
}

export default class AssetPut extends OpenAPIRoute {
  schema = {
    tags: ["미래 자산"],
    summary: "미래 자산 수정",
    request: {
      params: z.object({
        id: z.string({
          description: "자산 ID",
          required_error: "자산 ID는 필수입니다",
        }),
      }),
      body: {
        content: {
          "application/json": {
            schema: z.object({
              // 기본 정보
              name: z.string({
                description: "고객 이름",
              }),
              phone: z.string({
                description: "고객 전화번호",
              }),
              agree: z.boolean({
                description: "개인정보 동의",
              }),
            }),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "자산 정보가 성공적으로 수정됨",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  id: z.string(),
                  name: z.string(),
                  phone: z.string(),
                  agree: z.boolean(),
                }),
              }),
            }),
          },
        },
      },
      "400": {
        description: "잘못된 요청",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                error: Str(),
              }),
            }),
          },
        },
      },
      "404": {
        description: "자산 정보를 찾을 수 없음",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                error: Str(),
              }),
            }),
          },
        },
      },
      "500": {
        description: "서버 오류",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                error: Str(),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c: { env: Env }) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { id } = data.params;
    const { name, phone, agree } = data.body;

    // 먼저 해당 ID의 자산이 존재하는지 확인
    const ASSET_CHECK = `SELECT id FROM ASSET WHERE id = ?`;
    const checkResult = await c.env.DB.prepare(ASSET_CHECK).bind(id).first();

    if (!checkResult) {
      return Response.json(
        {
          success: false,
          error: "해당 ID의 자산 정보를 찾을 수 없습니다",
        },
        {
          status: 404,
        }
      );
    }

    const ASSET_UPDATE = `
      UPDATE ASSET
      SET 
        name = ?,
        phone = ?,
        agree = ?
      WHERE id = ?
    `;

    const { success } = await c.env.DB.prepare(ASSET_UPDATE)
      .bind(name, phone, agree, id)
      .run();

    if (!success) {
      return Response.json(
        {
          success: false,
          error: "자산 정보 수정 중 오류가 발생했습니다",
        },
        {
          status: 500,
        }
      );
    }

    const result = {
      id: parseInt(id),
      name,
      phone,
      agree,
    };

    return toJSON(result, 200, "asset");
  }
}

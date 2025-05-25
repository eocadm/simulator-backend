import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { toJSON } from "../../utils";

interface Env {
  DB: D1Database;
}

export default class AssetDelete extends OpenAPIRoute {
  schema = {
    tags: ["미래 자산"],
    summary: "미래 자산 삭제",
    request: {
      params: z.object({
        id: z.string({
          description: "자산 ID",
          required_error: "자산 ID는 필수입니다",
        }),
      }),
    },
    responses: {
      "200": {
        description: "자산 정보가 성공적으로 삭제됨",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  id: z.string(),
                }),
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

    // 먼저 자산 정보가 존재하는지 확인
    const ASSET_CHECK = `
      SELECT id FROM ASSET WHERE id = ?
    `;

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

    const ASSET_DELETE = `
      DELETE FROM ASSET
      WHERE id = ?
    `;

    const { success } = await c.env.DB.prepare(ASSET_DELETE).bind(id).run();

    if (!success) {
      return Response.json(
        {
          success: false,
          error: "자산 정보 삭제 중 오류가 발생했습니다",
        },
        {
          status: 500,
        }
      );
    }

    return toJSON({ id: parseInt(id) }, 200, "asset");
  }
}

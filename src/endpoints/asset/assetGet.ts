import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { toJSON } from "../../utils";
import { bearerAuth } from "hono/bearer-auth";

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export default class AssetGet extends OpenAPIRoute {
  schema = {
    tags: ["미래 자산"],
    summary: "미래 자산 조회",

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
        description: "자산 정보 조회 성공",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  id: z.string(),
                  name: z.string(),
                  phone: z.string(),
                  age: z.string(),
                  agree: z.boolean(),
                  industry_classification: z.string().optional(),
                  income: z.string().optional(),
                  industry_retirement: z.string().optional(),
                  saving: z.string().optional(),
                  stock: z.string().optional(),
                  pension: z.string().optional(),
                  rent: z.string().optional(),
                  insurance: z.string().optional(),
                  communication: z.string().optional(),
                  fixed_etc: z.string().optional(),
                  food_expense: z.string().optional(),
                  transportation_expense: z.string().optional(),
                  healthcare_expense: z.string().optional(),
                  variable_etc: z.string().optional(),
                  asset_saving: z.string().optional(),
                  asset_investment: z.string().optional(),
                  asset_etc: z.string().optional(),
                  debt_car: z.string().optional(),
                  debt_overdraft: z.string().optional(),
                  debt_loan: z.string().optional(),
                  debt_etc: z.string().optional(),
                  marriage_plan: z.boolean().optional(),
                  marriage_age: z.string().optional(),
                  ring: z.string().optional(),
                  wedding_hall: z.string().optional(),
                  studio: z.string().optional(),
                  dress_tuxedo: z.string().optional(),
                  makeup: z.string().optional(),
                  honeymoon: z.string().optional(),
                  vehicle_transport_mode: z.string().optional(),
                  vehicle_purchase_age: z.string().optional(),
                  vehicle_price_domestic: z.string().optional(),
                  vehicle_price_foreign: z.string().optional(),
                  vehicle_loan_amount: z.string().optional(),
                  vehicle_loan_interest: z.string().optional(),
                  residence_type: z.string().optional(),
                  rent_monthly: z.string().optional(),
                  rent_deposit: z.string().optional(),
                  house_purchase_age: z.string().optional(),
                  residence_area: z.string().optional(),
                  housing_price_local: z.string().optional(),
                  housing_price_capital: z.string().optional(),
                  housing_price_seoul: z.string().optional(),
                  housing_price_gangnam: z.string().optional(),
                  housing_loan_amount: z.string().optional(),
                  housing_loan_interest: z.string().optional(),
                  child_plan: z.boolean().optional(),
                  child_count: z.string().optional(),
                  first_child_age: z.string().optional(),
                  child_age_gap: z.string().optional(),
                  disorder_test: z.string().optional(),
                  baby_items: z.string().optional(),
                  child_insurance: z.string().optional(),
                  birth_type: z.string().optional(),
                  birth_room: z.string().optional(),
                  postpartum_care: z.string().optional(),
                  childcare_support: z.string().optional(),
                  toys: z.string().optional(),
                  first_birthday: z.string().optional(),
                  birthday_photo: z.string().optional(),
                  infant_education: z.string().optional(),
                  kindergarten: z.string().optional(),
                  elementary_school: z.string().optional(),
                  middle_school: z.string().optional(),
                  high_school: z.string().optional(),
                  private_highschool: z.string().optional(),
                  child_allowance: z.string().optional(),
                  university: z.string().optional(),
                  parent_count: z.string().optional(),
                  parent_allowance: z.string().optional(),
                  created_at: z.string(),
                  updated_at: z.string().nullable(),
                }),
              }),
            }),
          },
        },
      },
      "401": {
        description: "인증 실패",
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

  async handle(c: { env: Env; req: Request }) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { id } = data.params;

    const ASSET_GET = `
      SELECT *
      FROM ASSET
      WHERE id = ?
    `;

    const result = await c.env.DB.prepare(ASSET_GET).bind(id).first();

    if (!result) {
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

    return toJSON(result, 200, "asset");
  }
}

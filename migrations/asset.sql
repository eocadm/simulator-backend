DROP TABLE IF EXISTS ASSET;
CREATE TABLE IF NOT EXISTS ASSET (
  id integer PRIMARY KEY AUTOINCREMENT,
  
  -- 기본 정보
  name text NOT NULL,
  phone text NOT NULL,
  age text NOT NULL,
  agree boolean NOT NULL,

  -- 소득/지출 정보
  industry_classification text,
  income text,
  industry_retirement text,
  saving text,
  stock text,
  pension text,
  rent text,
  insurance text,
  communication text,
  fixed_etc text,
  food_expense text,
  transportation_expense text,
  healthcare_expense text,
  variable_etc text,

  -- 자산 정보
  asset_saving text,
  asset_investment text,
  asset_etc text,

  -- 부채 정보
  debt_car text,
  debt_overdraft text,
  debt_loan text,
  debt_etc text,

  -- 결혼 계획
  marriage_plan boolean,
  marriage_age text,
  ring text,
  wedding_hall text,
  studio text,
  dress_tuxedo text,
  makeup text,
  honeymoon text,

  -- 차량 계획
  vehicle_transport_mode text,
  vehicle_purchase_age text,
  vehicle_price_domestic text,
  vehicle_price_foreign text,
  vehicle_loan_amount text,
  vehicle_loan_interest text,

  -- 주거 계획
  residence_type text,
  rent_monthly text,
  rent_deposit text,
  house_purchase_age text,
  residence_area text,
  housing_price_local text,
  housing_price_capital text,
  housing_price_seoul text,
  housing_price_gangnam text,
  housing_loan_amount text,
  housing_loan_interest text,

  -- 자녀 계획
  child_plan boolean,
  child_count text,
  first_child_age text,
  child_age_gap text,
  disorder_test text,
  baby_items text,
  child_insurance text,
  birth_type text,
  birth_room text,
  postpartum_care text,
  childcare_support text,
  toys text,
  first_birthday text,
  birthday_photo text,
  infant_education text,
  kindergarten text,
  elementary_school text,
  middle_school text,
  high_school text,
  private_highschool text,
  child_allowance text,
  university text,

  -- 부모 지원
  parent_count text,
  parent_allowance text,

  -- 타임스탬프
  modified_date text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  inserted_date text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_asset ON ASSET (id);
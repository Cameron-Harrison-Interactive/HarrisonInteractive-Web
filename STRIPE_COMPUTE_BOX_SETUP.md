# Stripe Compute Box Setup

Status: 2026-06-20

## Meter

Use Stripe Billing Meter:

```text
Event name: hi_handy_compute_tokens
Unit: Compute Tokens
Recommended unit policy: 1 metered unit = 1,000 model/compute tokens
```

## Required Cloudflare environment variables

```text
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ELITE=price_...
STRIPE_PRICE_ULTIMATE=price_...
STRIPE_PRICE_ULTIMATE_COMPUTE_METERED=price_...
STRIPE_COMPUTE_METER_EVENT_NAME=hi_handy_compute_tokens
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL=https://billing.stripe.com/p/login/...
```

## D1 user columns

```sql
ALTER TABLE users ADD COLUMN compute_included INTEGER DEFAULT 250000;
ALTER TABLE users ADD COLUMN compute_used INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN compute_period_start TEXT;
ALTER TABLE users ADD COLUMN compute_period_end TEXT;
```

Also used by billing/account pages:

```text
stripe_customer_id
billing_email
billing_date
```

## Routes added

```text
GET  /api/compute/balance
POST /api/compute/report-usage
```

## Checkout behavior

`/api/stripe/checkout` includes:

```text
line_items[0] = Ultimate base subscription price
line_items[1] = Ultimate metered Compute Box price, if STRIPE_PRICE_ULTIMATE_COMPUTE_METERED exists
```

## Usage reporting behavior

`/api/compute/report-usage` reports Stripe meter events with:

```text
event_name=hi_handy_compute_tokens
payload[stripe_customer_id]=cus_...
payload[value]=<units>
timestamp=<now>
```

It also mirrors usage into D1:

```sql
compute_used = compute_used + units
```

## H.E.L.E.N.A. integration note

Before expensive Ultimate cloud/proprietary model routing, H.E.L.E.N.A. should estimate units and ask for confirmation. After successful cloud inference, the server should call `/api/compute/report-usage`.

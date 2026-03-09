#KB|# OpenSpec: Add Navbar to Seller Register Page
#KM|
#QK|## Summary
#ZM|Add the full navigation menu (Navbar) to the /seller/register page to match the homepage navigation structure.
#BT|
#KY|## Goals
#KQ|- Add Navbar component to /seller/register page
#ZX|- Match homepage navigation exactly
#RH|- Maintain responsive design
#SK|- Ensure all navigation links work correctly from /seller/register
#VN|
#TX|## Implementation
#WK|
#SJ|### File: `app/seller/register/page.tsx`
#BN|- Import Navbar component
#XZ|- Add Navbar at the top of the page
#ZQ|- Adjust page padding to account for fixed navbar (pt-14 already present)
#KS|
## Changes Required:
#SV|
1. Add import: `import { Navbar } from "@/components/navbar";`
#HZ|2. Add `<Navbar />` as first child in `<main>`
#SP|3. Keep existing pt-14 padding on main (already accounts for navbar height)
#TH|
#XK|## Acceptance Criteria
#HZ|1. Seller register page shows Navbar at top matching homepage
#SP|2. Navbar links work correctly from /seller/register
#TH|3. Responsive design maintained (mobile menu works)
#XK|4. Build passes
#XK|5. No visual regression on existing pages
#XK|6. Search functionality works if implemented

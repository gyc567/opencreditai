#KB|# OpenSpec: Add Audit Menu and Page
#KM|
#QK|## Summary
#ZM|Add "Audit" menu item to Navbar and create /audit page for auditing Skill files. Users can upload skill files, pay $10, and receive an audit report.
#BT|
#KY|## Goals
#KQ|- Add "Audit" to Navbar navigation
#ZX|- Create /audit page with file upload functionality
#RH|- Display $10 pricing
#SK|- Provide audit service for skill files
#VN|
#TX|## Implementation
#WK|
#SJ|### File: `components/navbar.tsx`
#BN|- Add "Audit" to navLinks array
#XZ|- Position between "Blog" and "Categories"
#ZQ|
#SV|### File: `app/audit/page.tsx` (NEW)
#HZ|- Create audit page component
#SP|- Hero section with title and description
#TH|- 3-step process display (Upload → Pay $10 → Get Report)
#XK|- File upload form with email input
#XK|- Supported file formats section
#XK|- FAQ section
#XK|- Privacy & Security notice
#XK|
#XK|### File: `app/audit/page.test.tsx` (NEW)
#HZ|- Test audit page renders correctly
#SP|- Test form elements exist
#TH|- Test pricing display
#XK|- 100% coverage
#XK|
## Acceptance Criteria
#HZ|1. "Audit" appears in Navbar navigation
#SP|2. /audit page is accessible
#TH|3. Page shows $10 pricing
#XK|4. File upload form with email input
#XK|5. Supported formats displayed
#XK|6. Build passes
#XK|7. Tests pass (100% coverage)
#XK|8. No regression

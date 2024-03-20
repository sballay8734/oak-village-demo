// IN ORDER
//! FIX M and E Work order types (REMOVE Success | Fail and replace to get refresh working properly)
//! Style work order submission form
//! Style Maintenance edit status form
//! Style Teacher View/Edit Work orders
//! Add teacher that submitted work order to card
//! Add back button in top left of create WO screen
//! Create WO Modal should have dropdown for Classroom and auto populate based on teachers classroom
//! Animations for input outlines and bgs
//! Loading spinner in middle of page about 50x50 with dark bg when anything is loading
//! Set "seen" status not working!

// ! TODO: FIX MAINTENENCE ZERO WORK ORDERS ERROR
// ! TODO: YOU STILL NEED TO REMOVE THE ROLE FROM BEING SENT BACK BUT YOU AREN'T SURE HOW ELSE YOU WILL NAVIGATE
// ! TODO: CAN'T ESCAPE KEYBOARD ON FORM!
// ! TODO: HOLDING DOWN CLOSE BUTTON ON RESPONSE MODAL CAUSES SCREEN TO FLICKER WHEN YOU LET GO
// ! TODO: SHOULD NOT BE USING LAZY QUERIES TO LOGIN I DON'T THINK (LAZY ARE FOR BACKGROUND LOADING)
// ! TODO: Include a payload for failed responses from server to handle empty arrays
// ! APPLY SAVE AREA STYLES TO ALL SCREENS IN PARENTS AND ADMIN (You already did maintenance and teacher)
// TODO: Add teacher the submitted Work
// TODO: Probably need a slight margin bottom on all pages (See Work orders, they have no space at bottom)
// TODO: Create work order button should hover in bottom right
// TODO: Fade inactive buttons
// TODO: Allow John to apply private priority to work orders
// TODO: Teacher work orders UI
// TODO: Sort by date for Work Orders
// TODO: Style work order pages
// TODO: Rewrite tabfilter logic it is messy
// TODO: Initialize animation logic for hover, loading, active, error, etc..

// TODO: Tag types for auth?
// TODO: Optimize the filtering used to determine the work order category count.
// TODO: Work order creation is not enforcing the classroom type
// TODO: isLoading states for all pages
// TODO: Wrap entire app in safearea view?

// TODO: How to "push" updates out to users? (When John updates a workOrder status, you'll want to push the update out or maybe you can modify the caching behavior in some way)
// TODO: You switched the UI style to light ONLY in app.json temporarily for testing
// TODO: Have a screen for the default "employee" in case admin has not set permissions
// TODO: State is not clearing properly
// ! .find() will always return and array in mongoose

// IN ORDER
//! Back button should not clear form
//! Add full name to employee model
//! Loading spinner in middle of page about 50x50 with dark bg when anything is loading
//! Prettify refresh spinner
//! I think all Work order filter tabs are rerendering anytime one is selected

// ! TODO: HOLDING DOWN CLOSE BUTTON ON RESPONSE MODAL CAUSES SCREEN TO FLICKER WHEN YOU LET GO
// ! TODO: SHOULD NOT BE USING LAZY QUERIES TO LOGIN I DON'T THINK (LAZY ARE FOR BACKGROUND LOADING)

// TODO: Work order comments from maintenance?
// TODO: Fade inactive buttons
// TODO: Allow John to apply private priority to work orders
// TODO: Sort by date for Work Orders
// TODO: Rewrite tabfilter logic it is messy
// TODO: Initialize animation logic for hover, loading, active, error, etc..

// TODO: Tag types for auth?
// TODO: Optimize the filtering used to determine the work order category count.
// TODO: Work order creation is not enforcing the classroom type
// TODO: isLoading states for all pages

// TODO: How to "push" updates out to users? (When John updates a workOrder status, you'll want to push the update out or maybe you can modify the caching behavior in some way)
// TODO: You switched the UI style to light ONLY in app.json temporarily for testing
// TODO: Have a screen for the default "employee" in case admin has not set permissions
// TODO: State is not clearing properly
// ! .find() will always return and array in mongoose

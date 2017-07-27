const getNavReducer = (AppNavigator) => {
  // see react-navigation docs
  const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('DocumentReviewList')
  );

  // see react-navigation docs
  return (state = initialState, action) => {
    return AppNavigator.router.getStateForAction(action, state) || state;
  };
};

export default getNavReducer;

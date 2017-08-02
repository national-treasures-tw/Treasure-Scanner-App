import { NavigationActions } from 'react-navigation';

const getNavReducer = (AppNavigator) => {
  // see react-navigation docs
  // const initialState = AppNavigator.router.getStateForAction(
  //   AppNavigator.router.getActionForPathAndParams('DocumentReviewList')
  // );
const firstAction = AppNavigator.router.getActionForPathAndParams('DocumentReviewList');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('LoginScreen');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

  // see react-navigation docs
  return (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
      case 'Login':
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.back(),
          state
        );
        break;
      case 'Logout':
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'LoginScreen' }),
          state
        );
        break;
      default:
        nextState = AppNavigator.router.getStateForAction(action, state);
        break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
    };
};

export default getNavReducer;

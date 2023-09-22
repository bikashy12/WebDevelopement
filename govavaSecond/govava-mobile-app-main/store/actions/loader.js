export const SETLOADING = 'SETLOADING';
export const SETWIZARDLOADING = 'SETWIZARDLOADING';
export const OFFALL = 'OFFALL';
export const setprofileloader = (loader_status) => {
    console.log('loader_status');
    console.log(loader_status);

    return (dispatch) => {
      dispatch({
        type: SETLOADING,
        loading: loader_status,
      });
    };
  };
  export const setwizardloader = (loader_status) => {
    console.log('loader_status');
    return (dispatch) => {
      dispatch({
        type: SETWIZARDLOADING,
        loading: loader_status,
      });
    };
  };
  export const closeallloaders = () => {
    return (dispatch) => {
      dispatch({
        type: OFFALL,
      });
    };
  };
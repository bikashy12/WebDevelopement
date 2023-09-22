import apis from '../../constants/api';

export const getPetwizardDetails = (user_id) => {
  let state = false;
  let result = '';
  let length = 0;
  let token;
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    const currentState = getState();
    const token = currentState['auth'].token;
    var url = apis.api + 'customer/pet/getPetwizardDetails';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        state = resData.petwizardDetails ? true : false;
        if (state) {
          result = resData.petwizardDetails;
          length = result.length;
        } else {
          result = [];
          length = 0;
        }
        console.log('Pet wizard details are result is ++++++');
        console.log(resData);

        // state = resData.status;
        // species = resData.species;
      })
      .catch(function (error) {
        // alert(error);
        result = [];
        length = 0;
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      pets: result,
      length: length,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getSpecies = () => {
  let state = false;
  let species = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/pet/getSpecies';
    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('species result is ++++++');
        console.log(resData);
        state = resData.status;
        species = resData.species;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      species: species,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getBreeds = (species_id) => {
  let state = false;
  let breeds = '';
  let token;
  let error = false;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/pet/getBreeds';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: species_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('breeds are++++');
        console.log(resData);
        state = resData.status;
        breeds = resData.breeds;
      })

      .catch(function (error) {
        // alert(error);

        error = true;
        message = 'Error,Please try again';
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      breeds: breeds,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getAllOccasions = (pet_id) => {
  let state = false;
  let message = '';
  let occasions = '';
  let token;
  // alert(pet_id);
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/pet/getAllOccasions';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pet_id: pet_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('pet occasion is');
        console.log(resData);
        // state = resData.status;
        occasions = resData.allOccasions;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      occasions: occasions,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getAllPreferences = () => {
  let state = false;
  let message = '';
  let preferences = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/pet/getAllPreferences';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('pet preference is');
        console.log(resData);
        // state = resData.status;
        preferences = resData.preferences;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      preferences: preferences,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getAllAgeranges = () => {
  let state = false;
  let agerange = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/pet/getAllAgeranges';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData.agerange.ageranges);
        console.log(resData.allAgeranges);
        agerange = resData.allAgeranges;
        state = resData.status;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      agerange: agerange,
      state: state,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getAllPriceRange = () => {
  let state = false;
  let message = '';
  let priceranges = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/pricerange/getAllPriceRange';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData);
        // state = resData.status;
        priceranges = resData.priceranges;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      priceranges: priceranges,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getAllRelations = () => {
  let state = false;
  let message = '';
  let relation = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/relations/getAllRelations';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        // state = resData.status;
        try {
          if (resData.relation.relations != 'undefined') {
            relation = resData.relation.relations;
            console.log('sdasdad');
          }
        } catch {
          // object does not exist
        }
        try {
          if (resData.relations != 'undefined') {
            relation = resData.relations;
            console.log('sdasdad');
          }
        } catch {
          // object does not exist
        }
      })

      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      relation: relation,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getPersonas = (ch_type, type, gender) => {
  let state = false;
  let message = '';
  let caricatures = [];
  let token;
  let error = false;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/persona/getPersonas';
    /*  console.log(JSON.stringify({
       ch_type: ch_type,
       type: type,
       gender:gender
     })); */
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ch_type: ch_type,
        type: type,
        gender: gender,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('resData');
        console.log(resData);
        // state = resData.status;

        state = resData.status;
        if (state) {
          caricatures = resData.caricatures;
          error = false;
          message = '';
        } else {
          caricatures = [];
          error = true;
          message = 'Error,Please try again';
        }
      })

      .catch(function (error) {
        // alert(error);
        caricatures = [];
        error = true;
        message = 'Error,Please try again';
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      caricatures: caricatures,
      error: error,
      message: message,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getFriends = (userData) => {
  console.log('jjj');
  console.log(userData);
  let state = false;
  let message = '';
  let friends = [];
  let token;
  let error = false;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/friend/getFriends';
    /*  console.log(JSON.stringify({
       ch_type: ch_type,
       type: type,
       gender:gender
     })); */
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify({
        user_id: userData.id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('resData');
        console.log(resData);
        // state = resData.status;

        state = resData.friends ? true : false;
        if (state) {
          friends = resData.friends;
          error = false;
          message = '';
        } else {
          friends = [];
          error = true;
          message = 'Error,Please try again';
        }
      })

      .catch(function (error) {
        // alert(error);
        friends = [];
        error = true;
        message = 'Error,Please try again';
        console.log('Error', error);
        console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      friends: friends,
      error: error,
      message: message,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const addFriends = (f_name, f_mobile, f_email, gender, userData) => {
  let state = false;
  let message = '';
  let friend = [];
  let token;
  let error = false;
  console.log(userData);
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/friend/addFriend';
    /*  console.log(JSON.stringify({
       ch_type: ch_type,
       type: type,
       gender:gender
     })); */
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userData.userId,
        friend_name: f_name,
        mobile: f_mobile,
        email: f_email,
        gender: gender,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('resData');
        console.log(resData);
        // state = resData.status;

        state = resData.status;
        if (state) {
          friend = resData.friend;
          error = false;
          message = '';
        } else {
          friend = [];
          error = true;
          message = 'Error,Please try again';
        }
      })

      .catch(function (error) {
        // alert(error);
        friends = [];
        error = true;
        message = 'Error,Please try again';
        console.log('Error', error);
        console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      friend: friend,
      error: error,
      message: message,
      token: token,
    });
    console.log('first' + retVal);
    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getWizardPetProducts = (params, userData) => {
  let state = false;
  let message = '';
  let products = [];
  let token;
  let error = false;
  let suggesteditems = [];
  let wizard_detail = '';
  let pet_id = null;
  let request_body = '';
  let totalPages = 1;
  console.log(params);
  // console.log(
  //   'data is ++++++++++++++++' +
  //     JSON.stringify({
  //       occasion: params.occasion_id,
  //       breed: params.breed_id,
  //       ageRange: params.ageRange_id,
  //       gender: params.gender,
  //       priceRange_from_price: params.priceRange_from_price,
  //       priceRange_to_price: params.priceRange_to_price,
  //       preferences: params.preference_id,
  //       type: params.species_id,
  //       image: params.image,
  //       weight: params.weight,
  //       name: params.name,
  //       user_id: userData.userId,
  //     }),
  // );
  let items = '';
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    const data = new FormData();
    data.append('occasion', params.occasion_id);
    data.append('breed', params.breed_id);
    data.append('ageRange', params.ageRange_id);
    data.append('gender', params.gender);
    data.append(
      'priceRange_from_price',
      params.price_range ? params.price_range.from_price : '',
    );
    data.append(
      'priceRange_to_price',
      params.price_range ? params.price_range.to_price : '',
    );
    data.append(
      'preferences',
      params.preference_id ? params.preference_id : '',
    );
    data.append('type', params.species_id);
    data.append('weight', params.weight);
    data.append('name', params.name);
    data.append('access_type', 'mobile');
    data.append('user_id', userData.userId);
    data.append('pet_id', params.pet_id != null ? params.pet_id : '');
    // data.append('countryCode', params.countryCode ? params.countryCode : '');
    data.append('countryCode', 'US');

    //data.append('userid', props.values.userid);
    if (params.image != null) {
      data.append('image', {
        uri: params.image.uri,
        name: params.image.fileName || 'user_params.image.jpg',
        type: params.image.type,
      });
    }
    console.log('------------------------------------------');
    console.log(data);
    var url = apis.api + 'customer/products/getWizardPetProducts';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('result is ++++++++++++++');
        console.log(resData);
        // console.log(resData.response.totalPages);
        state = resData.status && resData.response.items;
        if (state) {
          products = resData.response.items;
          suggesteditems = resData.response.suggested_items;
          wizard_detail = resData.petDetails.petwizard_details;
          request_body = resData.request_body;
          totalPages = resData.response.totalPages;
          pet_id = resData.petDetails.id;
        } else {
          error = true;
          message = 'Network error';
        }
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        error = true;
        message = 'Network error';
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      products: products,
      suggesteditems: suggesteditems,
      request_body: request_body,
      totalPages: totalPages,
      message: message,
      error: error,
      pet_id: pet_id,
    });

    return retVal;
  };
};
export const nextPage = (request_body, page) => {
  let status = false;
  let items = '';
  // alert(searchInput);
  // alert('llllllllllllll');
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/pet_wizard/nextPage';
    const currentState = getState();
    const token = currentState['auth'].token;
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        request_body: request_body,
        page: page,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('success)))))))))))))))))))))');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        items = resData.response.items;
        // favourite = resData.favourite_array;
        status = resData.status;
        // suggested = resData.response.suggested_items;
      })
      .catch(function (error) {
        alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: status,
      items: items,
      // favourite: favourite,
      // suggested: suggested,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const deletePetData = (pet_id) => {
  let status = false;
  let message = '';
  return async (dispatch, getState) => {
    var url = apis.api + 'customer/pet/deletePet';
    const currentState = getState();
    const token = currentState['auth'].token;
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        id: pet_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('success)))))))))))))))))))))');
        console.log(resData);

        message = resData.message;
        status = resData.status;
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: status,
      message: message,
    });
    return retVal;
  };
};
export const updatePetDetails = (name, species_id,breed_id,age_id,gender,image,pet_id) => {
  let state = false;
  let message = '';

  console.log(name, species_id,breed_id,age_id,gender,image);
 
  return async (dispatch,getState) => {
    const currentState = getState();
    const userId = currentState['auth'].userId;
    const data = new FormData();
    data.append('name', name);
    data.append('gender', gender);
    data.append('species', species_id);
    data.append('breed', breed_id);
    data.append('weight', '');
    data.append('pet_id',pet_id);
    data.append('user_id', userId);
    data.append('age', age_id);
    if (image != null) {
      data.append('image', {
        uri: image.uri,
        name: image.fileName || 'user_params.image.jpg',
        type: image.type,
      });
    }
    console.log('------------------------------------------');
    console.log(data);
    var url = apis.api + 'customer/pet/updatePet';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('result is ++++++++++++++');
        console.log(resData);
        // console.log(resData.response.totalPages);
        state = resData.status ;
        if (state) {
         message=resData.message;
        } else {
          error = true;
          message=resData.message;
        }
      })
      .catch(function (error) {

        console.log('Error', error);
        error = true;
        message = 'Network error';
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
  };
};
import apis from '../../constants/api';

export const menuList = () => {
  let state = false;
  let message = '';
  let menu = '';
  let token;
  // console.log('hlooooooooooooooooo');
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/menu/menuList';
    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('Menu list is');
        // console.log(resData);
        if (resData.menus) {
          menu = resData.menus;
        } else {
          menu = [];
        }
        // state = resData.status;
        // try {
        //   if (resData.relation.relations != 'undefined') {
        //     relation = resData.relation.relations;
        //     console.log('sdasdad');
        //   }
        // } catch {
        //   // object does not exist
        // }
        // try {
        //   if (resData.relations != 'undefined') {
        //     relation = resData.relations;
        //     console.log('sdasdad');
        //   }
        // } catch {
        //   // object does not exist
        // }
      })

      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      menu: menu,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};

export const getOccasions = () => {
  let state = false;
  let message = '';
  let occasions = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/occasion/getOccasions';
    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData);
        // state = resData.status;
        occasions = resData.occasions;
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

export const getAgerange = (type) => {
  let state = false;
  let message = '';
  let agerange = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/agerange/getAgerange';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData.agerange.ageranges);
        try {
          if (resData.agerange.ageranges != 'undefined') {
            agerange = resData.agerange.ageranges;
            console.log('sdasdad');
          }
        } catch {
          // object does not exist
        }
        try {
          if (resData.ageranges != 'undefined') {
            agerange = resData.ageranges;
            console.log('sdasdad');
          }
        } catch {
          // object does not exist
        }

        // if (resData.agerange.ageranges != 'undefined') {
        //   agerange = resData.agerange.ageranges;
        //   console.log('sdasdad');
        // }
        // if (resData.agerange != 'undefined') {
        //   agerange = resData.agerange;
        //   console.log('aaaaaaaaaa');
        // }
        // state = resData.status;
        // occasions = resData.occasions;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      agerange: agerange,
      token: token,
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
    console.log(
      JSON.stringify({
        ch_type: ch_type,
        type: type,
        gender: gender,
      }),
    );
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
        console.log('resData))))))))))))))))))))))))))');
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
export const deleteFriend = (contact_id) => {
  let state = false;
  let message = '';
  let friend = [];
  let token;
  let error = false;
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    const currentState = getState();
    const token = currentState['auth'].token;
    var url = apis.api + 'customer/usercontact/' + contact_id;
    /*  console.log(JSON.stringify({
       ch_type: ch_type,
       type: type,
       gender:gender
     })); */
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('resData');
        console.log(resData);
        // state = resData.status;

        state = resData.status;
        message = resData.message;
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
      message: message,
    });
    console.log('first' + retVal);
    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const usercontact = (
  name,
  email,
  mobile1,
  contact_id,
  user_id,
  params,
) => {
  let state = false;
  let message = '';
  let friend = [];
  let token;
  let error = false;

  console.log('::::::::::::::::::::');
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/usercontact/' + contact_id;
    /*  console.log(JSON.stringify({
       ch_type: ch_type,
       type: type,
       gender:gender
     })); */
    await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        user_id: user_id,
        gender: params['gender'],
        email: email,
        mobile1: mobile1,
        mobile2: '',
        activelifestyle: params['styles_id'],
        charactertrait: params['character_id'],
        persona: params['personas_id'],
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('resData');
        console.log(resData);
        state = resData.status;
        message = resData.message;

        // message = resData.status;
        // if (state) {
        //   friend = resData.friend;
        //   error = false;
        //   message = '';
        // } else {
        //   friend = [];
        //   error = true;
        //   message = 'Error,Please try again';
        // }
      })

      .catch(function (error) {
        // alert(error);
        // friends = [];
        // error = true;
        // message = 'Error,Please try again';
        console.log('Error', error);
        console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });
    console.log('first' + retVal);
    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getWizardProducts = (params, userData) => {
  let state = false;
  let message = '';
  let wizard_detail = '';
  let products = [];
  let token;
  let error = false;
  let suggesteditems = [];
  console.log(userData);
  let occasion = params.occasion ? params.occasion.id : '';
  let ageGroup = params.type ? params.type : '';
  let ageRange = params.age_label ? params.age_label.id : '';
  let searchText = '';
  let gender = params.gender ? params.gender : '';
  let priceRange_from_price = params.price_range
    ? params.price_range.from_price
    : '';
  let priceRange_to_price = params.price_range
    ? params.price_range.to_price
    : '';
  if (params.gender == 'Male') {
    searchText = params.age_label ? params.age_label.male_search_text : '';
  } else {
    searchText = params.age_label ? params.age_label.female_search_text : '';
  }
  let characterTrait = params.character ? params.character.id : '';
  let activeLifeStyle = params.styles ? params.styles.id : '';
  let persona = params.personas ? params.personas.id : '';
  let relation = params.relation ? params.relation.id : '';

  try {
    console.log('Request is  ');
    console.log(
      JSON.stringify({
        occasion: params.occasion_id,
        ageGroup: ageGroup,
        ageRange: params.ageRange_id,
        searchText: params.searchText,
        gender: params.gender,
        priceRange_from_price: priceRange_from_price,
        priceRange_to_price: priceRange_to_price,
        characterTrait: params.character_id,
        activeLifeStyle: params.styles_id,
        contact_id: params.friend ? params.friend.id : null,
        persona: params.personas_id,
        relation: params.relation_id,
        user_id: userData.userId,
        // countryCode: params.countryCode ? params.countryCode : '',
        countryCode: 'US'
      }),
    );
  } catch (err) {
    console.log(err);
  }
  let items = '';
  let request_body = '';
  let totalPages = 1;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/products/getWizardProducts';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        occasion: params.occasion_id,
        ageGroup: ageGroup,
        ageRange: params.ageRange_id,
        searchText: params.searchText,
        gender: params.gender,
        priceRange_from_price: priceRange_from_price,
        priceRange_to_price: priceRange_to_price,
        characterTrait: params.character_id,
        activeLifeStyle: params.styles_id,
        contact_id: params.friend ? params.friend.id : null,
        persona: params.personas_id,
        relation: params.relation_id,
        user_id: userData.userId,
        // countryCode: params.countryCode ? params.countryCode : '',
        countryCode: 'US'
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        state = resData.status && resData.response.items;
        console.log(resData);
        console.log(resData.request_body);
        console.log(resData.response.totalPages);
        if (state) {
          items = resData.response.items;
          wizard_detail = resData.wizard_detail;
          suggesteditems = resData.response.suggested_items;
          request_body = resData.request_body;
          totalPages = resData.response.totalPages;
        } else {
          (items = []),
            (wizard_detail = ''),
            (suggesteditems = []),
            // (error = true);
            // message = 'Something went wrong,please try again.';
            console.log(message);
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
      items: items,
      suggesteditems: suggesteditems,
      wizard_detail: wizard_detail,
      request_body: request_body,
      totalPages: totalPages,
      message: message,
      error: error,
    });

    return retVal;
  };
};
export const getGiftWizardProducts = (params, userData) => {
  let state = false;
  let message = '';
  let wizard_detail = '';
  let request_body = '';
  let totalPages = 1;
  let products = [];
  let token;
  let error = false;
  let suggesteditems = [];
  console.log(userData);
  let occasion = params.occasion ? params.occasion.id : '';
  let ageGroup = params.type ? params.type : '';
  let ageRange = params.age_label ? params.age_label.id : '';
  let searchText = '';
  let gender = params.gender ? params.gender : '';
  let priceRange_from_price = params.price_range
    ? params.price_range.from_price
    : '';
  let priceRange_to_price = params.price_range
    ? params.price_range.to_price
    : '';
  if (params.gender == 'Male') {
    searchText = params.age_label ? params.age_label.male_search_text : '';
  } else {
    searchText = params.age_label ? params.age_label.female_search_text : '';
  }
  let characterTrait = params.character ? params.character.id : '';
  let activeLifeStyle = params.styles ? params.styles.id : '';
  let persona = params.personas ? params.personas.id : '';
  let relation = params.relation ? params.relation.id : '';

  console.log(
    JSON.stringify({
      occasion: params.occasion_id,
      ageGroup: params.age_group,
      ageRange: params.ageRange_id,
      searchText: 'girls',
      gender: params.gender,
      priceRange_from_price: priceRange_from_price,
      priceRange_to_price: priceRange_to_price,
      characterTrait: params.character_id,
      activeLifeStyle: params.styles_id,
      contact_id: params.friend ? params.friend.id : null,
      persona: params.personas_id,
      relation: params.relation_id,
      user_id: userData.userId,
      countryCode: params.countryCode ? params.countryCode : '',
    }),
  );
  let items = '';
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/wizard/underFifty';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        occasion: params.occasion_id,
        ageGroup: ageGroup,
        ageRange: params.ageRange_id,
        searchText: params.searchText,
        gender: params.gender,
        priceRange_from_price: null,
        priceRange_to_price: null,
        characterTrait: params.character_id,
        activeLifeStyle: params.styles_id,
        contact_id: params.friend ? params.friend.id : null,
        persona: params.personas_id,
        relation: params.relation_id,
        user_id: userData.userId,
        countryCode: params.countryCode ? params.countryCode : '',
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('_______________________');
        console.log(resData);
        state = resData.status && resData.response.items;
        if (state) {
          items = resData.response.items;
          wizard_detail = resData.wizard_detail;
          suggesteditems = resData.response.suggested_items;
          request_body = resData.request_body;
          totalPages = resData.response.totalPages;
        } else {
          (items = []),
            (wizard_detail = ''),
            (suggesteditems = []),
            (error = true);
          message = 'Something went wrong,please try again.';
          console.log(message);
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
      items: items,
      suggesteditems: suggesteditems,
      wizard_detail: wizard_detail,
      request_body: request_body,
      totalPages: totalPages,
      message: message,
      error: error,
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
    var url = apis.api + 'customer/wizard/nextPage';
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
export const getBannerImages = () => {
  let status = false;

  let message = '';
  let items = '';
  let token = '';

  return async () => {
    var url = apis.api + 'customer/page/getMobilesliderImages';
    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('success');
        console.log(JSON.stringify(resData));
        items = resData.mobslider;
        status = resData.mobslider ? true : false;
        message = '';
      })
      .catch(function (error) {
        // alert(error);
        items = [];
        status = false;
        message = 'Error Please try again';
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: status,
      items: items,
      message: message,
      // token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};

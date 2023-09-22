import apis from '../../constants/api';
import * as RNLocalize from 'react-native-localize';

// import Shop from '../../models/shop';

// export const SET_MEDICINES = 'SET_MEDICINES';

export const getBrowseCategories = () => {
  let state = false;
  let message = '';
  let browsemenu = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/browsemenu/getBrowseMenu';
    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        state = resData.status;
        browsemenu = resData.browsemenu;
        // console.log('Status ', state, 'Message ', message);
        // const loadedShops = [];
        // for (const key in resShopData) {
        //   loadedShops.push(
        //     new Shop(
        //       resShopData[key].id,
        //       resShopData[key].name,
        //       resShopData[key].mobile,
        //       resShopData[key].email,
        //       resShopData[key].gst,
        //       resShopData[key].license_no,
        //       resShopData[key].status,
        //       resShopData[key].location,
        //       apis.api + resShopData[key].image,
        //       //   'https://im.hunt.in/cg/Andhra/Kurnool/City-Guide/apollo-pharmacy.jpg',
        //     ),
        //   );
        //   // console.log('Shop Image', apis.api + resShopData[key].image);
        // }
        // dispatch({
        //   type: SET_SHOPS,
        //   shops: loadedShops,
        // });
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      browsemenu: browsemenu,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};

export const getProducts = (user_id) => {
  let status = false;
  let message = '';
  let items = '';
  let wishlist = '';
  let favourite = [];
  let suggested = [];
  let token;
  console.log('user id is' + user_id);
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/products/getProducts';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
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
        favourite = resData.favourite_array;
        status = resData.response.status;
        suggested = resData.response.suggested_items;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: status,
      items: items,
      favourite: favourite,
      suggested: suggested,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getProductsCategorywise = (cat_id) => {
  let state = false;
  let message = '';
  let items = '';
  let wishlist = '';
  let token;
  let total = 0;
  return async (dispatch) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/products/getBrowseProducts/' + cat_id;
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('success');
        console.log(resData);
        console.log('Result categories', resData);
        items = resData.response.items;
        total = resData.response.totalMatches;
        // wishlist = resData.wishlist_arry;
        state = resData.status;
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      items: items,
      total: total,
      //wishlist: wishlist,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getcouponDetails = (product_id) => {
  let state = false;
  let message = '';
  let coupons = [];
  let linkurl = '';
  let token;
  let total = 0;
  console.log(product_id);
  return async (dispatch) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/products/getcouponDetails';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: product_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('success');
        console.log(resData);
        // console.log('Result categories', resData);
        if (resData.status && resData.response.coupons) {
          coupons = resData.response.coupons;
          linkurl = resData.response.linkurl;
          // wishlist = resData.wishlist_arry;
          state = resData.status;
        }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      coupons: coupons,
      linkurl: linkurl,
      //wishlist: wishlist,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const updatestatus = (product_id, user_id, buynow_status) => {
  let state = false;
  let message = '';
  console.log(product_id);
  console.log(user_id);
  console.log(buynow_status);
  return async (dispatch) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/userwishlist/updatestatus';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: product_id,
        user_id: user_id,
        buynow_status: buynow_status,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('success');
        console.log(resData);
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        state = resData.status;
        message = resData.message;
        // }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const keyword_search = (searchInput, page) => {
  let status = false;
  let items = '';
  let totalPages = 1;
  // alert(searchInput);
  // alert('llllllllllllll');
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/search/keyword_search';
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
        keyword: searchInput,
        category: null,
        page: page,
        // countryCode: RNLocalize.getCountry(),
        countryCode: 'US',
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('success)))))))))))))))))))))');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        items = resData.response.item;
        // favourite = resData.favourite_array;
        status = resData.status;
        totalPages = resData.response.TotalPages;
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
      totalPages: totalPages
      // favourite: favourite,
      // suggested: suggested,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const keyword_search_gift = (page) => {
  let status = false;
  let items = '';
  let totalPages = 1;
  // alert(searchInput);
  // alert('llllllllllllll');
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/search/keyword_search';
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
        keyword: 'gift card',
        type: 'gift_card',
        category: null,
        page: page,
        // countryCode: RNLocalize.getCountry(),
        countryCode: 'US',
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(JSON.stringify({
          keyword: 'gift card',
          category: null,
          page: page,
          countryCode: RNLocalize.getCountry(),
        }));
        console.log('success))&&&&&&&&&&&&&&&&&&&)))');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        items = resData.response.item;
        // favourite = resData.favourite_array;
        status = resData.status;
        // suggested = resData.response.suggested_items;
        totalPages = resData.response.TotalPages;
      })
      .catch(function (error) {
        alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: status,
      items: items,
      totalPages: totalPages
      // favourite: favourite,
      // suggested: suggested,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const userwishlist = (
  user_id,
  pro,
  product_id,
  wizard_detail,
  wizard_type,
  pet_id,
  occasion_id,
) => {
  console.log(occasion_id);
  let state = false;
  let message = '';
  // alert(
  //   'hi' +
  //     JSON.stringify({
  //       product_id: product_id,
  //       product: pro,
  //       user_id: user_id,
  //     }),
  // );
  // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  console.log(pro);
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/userwishlist';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: product_id,
        product: pro,
        user_id: user_id,
        clickstream_data: wizard_detail,
        user_action: 'AddToWishlist',
        wishlist_type: wizard_type,
        pet_id: pet_id,
        occasion_id: occasion_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('+++++++++++++++++++++++++++');
        console.log('successmmmmmmmmmmmmmmmmmmm');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        message = resData.message;
        state = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
  };
};
export const userfavorite = (user_id, pro, product_id, wizard_detail) => {
  let state = false;
  let message = '';
  // alert(
  //   'hi' +
  //     JSON.stringify({
  //       product_id: product_id,
  //       product: pro,
  //       user_id: user_id,
  //     }),
  // );
  // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  console.log(pro);
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/favourite';
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
        product_id: product_id,
        product: pro,
        user_id: user_id,
        clickstream_data: wizard_detail,
        user_action: 'AddTToFav',
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        // console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        message = resData.message;
        state = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
  };
};
export const savegift = (
  user_id,
  pro,
  product_id,
  user_contact_id,
  wizard_detail,
  occasion_id,
  pet_id
) => {
  let state = false;
  let message = '';
  // alert(
  //   'hi' +
  //     JSON.stringify({
  //       product_id: product_id,
  //       product: pro,
  //       user_id: user_id,
  //     }),
  // );
  // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  console.log('datasssssssssssssssssssssssssssssssssssss',
    JSON.stringify({
      product_id: product_id,
      product: pro,
      user_id: user_id,
      user_contact_id: user_contact_id,
      clickstream_data: wizard_detail,
      user_action: 'SavedForGiftee',
      occasion_id: occasion_id,
      pet_id:pet_id
    }),
  );
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/savegift';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: product_id,
        product: pro,
        user_id: user_id,
        user_contact_id: user_contact_id,
        clickstream_data: wizard_detail,
        user_action: 'SavedForGiftee',
        occasion_id: occasion_id,
        pet_id:pet_id
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('+++++++++++++++++++++++++++');
        console.log('success');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        message = resData.message;
        state = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
  };
};
export const SaveClickDatas = (user_id, pro, product_id, wizard_detail) => {
  let state = false;
  let message = '';
  // alert(
  //   'hi' +
  //     JSON.stringify({
  //       product_id: product_id,
  //       product: pro,
  //       user_id: user_id,
  //     }),
  // );
  // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  console.log(pro);
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'clickstream/SaveClickDatas';
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
        product_id: product_id,
        product: pro,
        user_id: user_id,
        clickstream_data: wizard_detail,
        user_action: 'AddToCart',
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        // console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        // message = resData.message;
        // state = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: true,
      message: message,
    });

    return retVal;
  };
};
export const getwishlistProducts = (user_id, wizard_type) => {
  let state = false;
  let wishlist = [];
  let occasion_lists = [];
  let pet_lists = [];
  console.log(
    JSON.stringify({
      user_id: user_id,
      wishlist_type: wizard_type,
    }),
  );
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/userwishlist/getwishlistProducts';
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
        user_id: user_id,
        wishlist_type: wizard_type,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('==============');
        console.log('success');
        console.log(resData);

        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);

        if (resData.occasion_lists) {
          wishlist = resData.wishlist;
          occasion_lists = resData.occasion_lists;
          state = resData.status;
          //pet_lists=resData.PetList;
        }
        if (resData.wishlist.PetList) {
          pet_lists = resData.wishlist.PetList;
        }
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      wishlist: wishlist,
      occasion_lists: occasion_lists,
      pet_lists: pet_lists,
    });

    return retVal;
  };
};
export const getGiftProducts = (user_id) => {
  let state = false;
  let contacts = [];

  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/usercontact/getContactGift';
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
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('+++++++++++++++++++++++++++');
        console.log('success');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        contacts = resData.usercontact;
        state = resData.usercontact ? true : false;
        if(resData.status){
          dispatch({
            type: 'LOAD_GIFTS',
            pet_gifts: resData.pets,
          });
        }
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: state,
      contacts: contacts,
    });

    return retVal;
  };
};

export const deleteFavoriteProduct = (user_id, product_id) => {
  let state = false;
  let message = '';
  // alert('hi' + user_id);
  // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');

  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/favourite/deleteProduct';
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
        user_id: user_id,
        product_id: product_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        // console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        message = resData.message;
        state = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
  };
};
export const deleteuserwishlist = (user_id, product_id) => {
  let state = false;
  let message = '';
  // alert('hi' + user_id);
  // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');

  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/userwishlist/deleteProduct';
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
        user_id: user_id,
        product_id: product_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        // console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        message = resData.message;
        state = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
  };
};

export const getPages = () => {
  let state = false;
  let page = '';
  let browsemenu = '';
  let token;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/page/getPages';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // const resShopData = resData.shops;
        // console.log('Result new', resData[0]);
        // console.log('Result categories', resData);
        page = resData.page;
        // browsemenu = resData.browsemenu;
      })
      .catch(function (error) {
        // alert(error);

        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      page: page,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const getfavoriteproducts = (user_id) => {
  let state = false;
  let wishlist = '';
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/favourite/getfavouriteProducts';
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
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        // console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        wishlist = resData.favproduct;
        // status = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      wishlist: wishlist,
    });

    return retVal;
  };
};
export const deletegiftResult = (user_id, product_id) => {
  let status = false;
  let message = '';
  // alert('hi' + user_id);
  // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');

  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/savegift/deleteProduct';
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
        user_id: user_id,
        product_id: product_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        // console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        message = resData.message;
        status = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: status,
      message: message,
    });

    return retVal;
  };
};

export const changeWishlistStatus = (wishlist_status, user_id) => {
  let status = false;
  let message = '';
  // alert('hi' + user_id);
  console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  console.log(
    JSON.stringify({
      user_id: user_id,
      wishlist_status: wishlist_status,
    }),
  );
  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/changeWishlistStatus';
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
        user_id: user_id,
        wishlist_status: wishlist_status,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('+++++++++++++++++++++++++++');
        console.log('success');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        message = resData.message;
        status = resData.status;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: status,
      message: message,
    });

    return retVal;
  };
};
export const getwishlistStatus = (user_id) => {
  let status = false;
  let wishlist_status = '';

  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/getWishlistStatus';
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
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        //console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        // console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        // wishlist = resData.wishlist;
        status = resData.status;
        if (status) {
          wishlist_status = resData.wishlist_status;
        }
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      status: status,
      wishlist_status: wishlist_status,
    });

    return retVal;
  };
};
export const getFriendWishlists = (user_id) => {
  let state = false;
  let contacts = [];

  return async (dispatch, getState) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/wishlist/user_contacts';
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
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('+++++++++++++++++++++++++++');
        // console.log('success');
        console.log(resData);
        // const resShopData = resData.shops;
        // console.log('Result shop', resShopData);
        // console.log('Result categories', resData);
        contacts = resData.contacts;
        state = resData.contacts ? true : false;
      })
      .catch(function (error) {
        console.log('Error', error);
      });

    const retVal = JSON.stringify({
      state: state,
      contacts: contacts,
    });

    return retVal;
  };
};
export const createChat = (product, title, selectedmobilenumber) => {
  let state = false;
  let message = '';
  let chatmessage = null;
  // console.log(typeof product);
  // return;
  let product_details = JSON.stringify(product);
  return async (dispatch, getState) => {
    // alert(cat_id);
    // var url = apis.api + 'medicine/getMedicins';

    const currentState = getState();
    const token = currentState['auth'].token;
    console.log("Web Token : " + token);
    // var url = apis.api + 'customer/chat/store';
    var url = apis.test_api + 'customer/chat/store';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        product_details: product_details,
        chatReceiver_mobile_no: selectedmobilenumber,
        title: title,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('created chat result is');
        console.log(resData);
        // console.log('Result categories', resData);
        // if(resData.status &&resData.response.coupons ){
        // coupons = resData.response.coupons;
        // linkurl = resData.response.linkurl;
        // // wishlist = resData.wishlist_arry;
        state = resData.status;
        message = resData.message;
        chatmessage = resData.chatmessage
        // }
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      chatmessage: chatmessage
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
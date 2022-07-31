//Обновление аватара пользователя

const handleAvatarFormSubmit = (data, toggleBtnStatusCallback, closePopupCallback) => {
  toggleBtnStatusCallback(true);
  api.setAvatar({ avatar: data.link })
    .then((res) => {
      userProfile.setUserInfo(res);
      closePopupCallback();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      toggleBtnStatusCallback(false);
    })
};

// Редактирование профиля

const handleInfoFormSubmit = (data, toggleBtnStatusCallback, closePopupCallback) => {
  toggleBtnStatusCallback(true);
  api.setInfo({ name: data.name, about: data.about })
    .then((res) => {
      userProfile.setUserInfo(res);
      closePopupCallback();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      toggleBtnStatusCallback(false);
    })

};


Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([data, item]) => {

    // Загрузка информации о пользователе с сервера
    userProfile.setUserInfo(data);

    //Загрузка карточек с сервера
    cardList.renderItems(item);

  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
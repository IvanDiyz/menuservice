"use client";
import {
  addBasket,
  addDish,
  changeQuantity,
  clearState,
  deleteDish,
} from "@/store/setOrder/setOrder";
import Popup from "@/components/Popup/Popup";
import Buttons from "@/components/Buttons/Buttons";
import SuppleButton from "@/components/SuppleButton/SuppleButton";
import Totaldish from "@/components/Menuitems/Totaldish/Totaldish";
import { useEffect, useState } from "react";
import s from "./Menuitem.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { popupState } from "@/store/menu/menuSlice";

export default function Menuitem({ triger, dish, licenseType }) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { items, item } = selector((state) => state.setOrder);
  const [quantity, setQuantity] = useState(0);
  const [text, setComment] = useState("");

  useEffect(() => {
    items.reduce((sum, item) => {
      if (item.id === dish.id) {
        setQuantity(sum + item.quantity);
        return sum + item.quantity;
      }
      return sum;
    }, 0);
  }, [items]);
  const [popup, setPopup] = useState(false);

  const openPopup = (e) => {
    setPopup(true);
    dispatch(popupState(true));
  };
  const closePopup = (e) => {
    setComment("");
    setPopup(false);
    dispatch(clearState());
    dispatch(popupState(false));
  };

  const changeText = (e) => {
    setComment(e.target.value);
  };

  const clikedMinbox = () => {
    if (triger === 0) {
      openPopup();
    }
  };

  return (
    <div
      className={`${s.menuitem} ${triger === 0 ? `${s.menuitem__min}` : ""}`}
      onClick={clikedMinbox}
    >
      <Popup popup={popup} openPopup={openPopup} closePopup={closePopup} item={item}>
        <div
          style={
            dish.img
              ? { backgroundImage: `url(${dish.img})` }
              : {
                  backgroundImage: `url('/images/menuitem/stub.jpg')`,
                }
          }
          className={s.menuitem__popupPhoto}
        >
          <div className={s.menuitem__serves}>
            <div>
              {dish.cookingTime ? (
                <div
                  className={`${s.menuitem__servesTime} ${s.menuitem__servesItem}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="clock">
                      <path
                        id="Vector"
                        d="M7.99998 1.33334C7.1245 1.33334 6.25759 1.50578 5.44876 1.84081C4.63992 2.17584 3.90499 2.66691 3.28593 3.28596C2.03569 4.53621 1.33331 6.2319 1.33331 8.00001C1.33331 9.76812 2.03569 11.4638 3.28593 12.7141C3.90499 13.3331 4.63992 13.8242 5.44876 14.1592C6.25759 14.4942 7.1245 14.6667 7.99998 14.6667C9.76809 14.6667 11.4638 13.9643 12.714 12.7141C13.9643 11.4638 14.6666 9.76812 14.6666 8.00001C14.6666 7.12453 14.4942 6.25762 14.1592 5.44879C13.8241 4.63995 13.3331 3.90502 12.714 3.28596C12.095 2.66691 11.36 2.17584 10.5512 1.84081C9.74236 1.50578 8.87546 1.33334 7.99998 1.33334ZM10.8 10.8L7.33331 8.66668V4.66668H8.33331V8.13334L11.3333 9.93334L10.8 10.8Z"
                        fill="#F5F5F5"
                      />
                    </g>
                  </svg>

                  <p>{dish.cookingTime} хв</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {dish.weight ? (
              <div
                className={`${s.menuitem__servesWeight} ${s.menuitem__servesItem}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="weight-gram">
                    <path
                      id="Vector"
                      d="M13.3 7.04C13.1666 6.44667 12.6333 6 12 6H10.3066C10.54 5.60667 10.6666 5.15333 10.6666 4.66667C10.6666 3.95942 10.3857 3.28115 9.8856 2.78105C9.3855 2.28095 8.70722 2 7.99998 2C7.29274 2 6.61446 2.28095 6.11436 2.78105C5.61426 3.28115 5.33331 3.95942 5.33331 4.66667C5.33331 5.15333 5.45998 5.60667 5.69331 6H3.99998C3.36665 6 2.83331 6.44667 2.69998 7.04C1.35998 12.38 1.33331 12.52 1.33331 12.6667C1.33331 13.0203 1.47379 13.3594 1.72384 13.6095C1.97389 13.8595 2.31302 14 2.66665 14H13.3333C13.6869 14 14.0261 13.8595 14.2761 13.6095C14.5262 13.3594 14.6666 13.0203 14.6666 12.6667C14.6666 12.52 14.64 12.38 13.3 7.04ZM7.99998 3.33333C8.3536 3.33333 8.69274 3.47381 8.94279 3.72386C9.19284 3.97391 9.33331 4.31304 9.33331 4.66667C9.33331 5.02029 9.19284 5.35943 8.94279 5.60948C8.69274 5.85952 8.3536 6 7.99998 6C7.64636 6 7.30722 5.85952 7.05717 5.60948C6.80712 5.35943 6.66665 5.02029 6.66665 4.66667C6.66665 4.31304 6.80712 3.97391 7.05717 3.72386C7.30722 3.47381 7.64636 3.33333 7.99998 3.33333ZM9.99998 8.66667H7.33331V11.3333H8.66665V9.33333H9.99998V12.6667H7.33331C6.59331 12.6667 5.99998 12.0733 5.99998 11.3333V8.66667C5.99998 7.92667 6.59331 7.33333 7.33331 7.33333H9.99998V8.66667Z"
                      fill="white"
                    />
                  </g>
                </svg>
                <p>{dish.weight} г</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={s.menuitem__alergenBox}>
            {dish.isAllergen ? (
              <span className={s.menuitem__alergen}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="alarm-light">
                    <path
                      id="Vector"
                      d="M4 4.60002L2.58 3.18669L3.52 2.24669L4.93333 3.66669L4 4.60002ZM8.66667 0.666687V2.66669H7.33333V0.666687H8.66667ZM13.42 3.18669L12 4.60002L11.0667 3.66669L12.48 2.24669L13.42 3.18669ZM3 7.00002V8.33335H1V7.00002H3ZM13 7.00002H15V8.33335H13V7.00002ZM4 13.3334H12C12.3536 13.3334 12.6928 13.4738 12.9428 13.7239C13.1929 13.9739 13.3333 14.3131 13.3333 14.6667H2.66667C2.66667 14.3131 2.80714 13.9739 3.05719 13.7239C3.30724 13.4738 3.64638 13.3334 4 13.3334ZM8 3.33335C9.06087 3.33335 10.0783 3.75478 10.8284 4.50493C11.5786 5.25507 12 6.27249 12 7.33335V12.6667H4V7.33335C4 6.27249 4.42143 5.25507 5.17157 4.50493C5.92172 3.75478 6.93913 3.33335 8 3.33335Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ) : (
              ""
            )}
            {dish.allergens.map( i => i.id === 1 && (
              <span key={i.id} className={s.menuitem__vegan}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="leaf">
                    <path
                      id="Vector"
                      d="M11.3333 5.33333C5.33331 6.66667 3.93331 10.78 2.54665 14.2267L3.80665 14.6667L4.43998 13.1333C4.75998 13.2467 5.09331 13.3333 5.33331 13.3333C12.6666 13.3333 14.6666 2 14.6666 2C14 3.33333 9.33331 3.5 5.99998 4.16667C2.66665 4.83333 1.33331 7.66667 1.33331 9C1.33331 10.3333 2.49998 11.5 2.49998 11.5C4.66665 5.33333 11.3333 5.33333 11.3333 5.33333Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ))}
            {dish.isSpicy ? (
              <span className={s.menuitem__spicy}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="chili-mild">
                    <path
                      id="Vector"
                      d="M13.3327 8.33341V18.3334C13.3327 18.3334 6.66602 16.6667 6.66602 9.16675V8.33341C6.66602 7.72508 6.99935 7.19175 7.49935 6.90008L8.54102 7.50008L9.99935 6.66675L11.4577 7.50008L12.4993 6.90008C12.9993 7.19175 13.3327 7.72508 13.3327 8.33341ZM9.99935 5.41675L11.4577 6.25008L12.7243 5.52508C12.266 4.71675 11.591 4.11675 10.8077 3.87508C10.6577 2.63341 9.61602 1.66675 8.33268 1.66675V3.33341C8.69935 3.33341 8.99935 3.57508 9.11602 3.90841C8.35768 4.16675 7.71602 4.75008 7.27435 5.52508L8.54102 6.25008L9.99935 5.41675Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ) : (
              ""
            )}
            {dish.isTop ? (
              <span className={s.menuitem__top}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="star">
                    <path
                      id="Vector"
                      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ) : (
              ""
            )}
            {dish.isNew ? <span className={s.menuitem__new}>NEW</span> : ""}
            {dish.discount ? (
              <span className={s.menuitem__discount}>
                -{Math.round(100 - (dish.discount / dish.cost) * 100)}%
              </span>
            ) : (
              ""
            )}
          </div>
          <span className={s.menuitem__popupClose} onClick={closePopup}></span>
        </div>
        <div
          className={`${s.menuitem__popupInform} ${
            item?.amount ? `${s.menuitem__popupInform__triger}` : ""
          }`}
        >
          <div
            className={`${s.menuitem__popupWrapper} ${s.menuitem__popupName}`}
          >
            <div className={s.menuitem__info_box}>
              <p className={s.menuitem__name}>{dish.name}</p>
              <div>
                {dish.discount ? (
                  <p className={s.menuitem__price}>
                    <span className={s.menuitem__priceDiscount}>
                      {+dish.cost} ₴
                    </span>
                    <span>{+dish.discount} ₴</span>
                  </p>
                ) : (
                  <p className={s.menuitem__price}>{+dish.cost} ₴</p>
                )}
              </div>
            </div>
            {licenseType?.isOrderOn && (
              <div className={s.menuitem__info_btn}>
                <Buttons
                  costDiscount={dish.discount ? dish.discount : dish.cost}
                  dish={dish}
                  addDish={addDish}
                  changeQuantity={changeQuantity}
                  deleteDish={deleteDish}
                />
              </div>
            )}
          </div>
          {dish.ingredients?.length > 0 ? (
            <div className={s.menuitem__popupWrapper}>
              <h4 className={s.menuitem__popupTitle}>Склад страви:</h4>
              <p className={s.menuitem__popupText}>{dish.ingredients}</p>
            </div>
          ) : (
            ""
          )}
          {dish.allergens.length > 0 ? (
            <div className={s.menuitem__popupWrapper}>
              <h4 className={s.menuitem__popupTitle}>Алергени:</h4>
              <ul className={s.menuitem__popupText}>
                {dish.allergens.map((el) => (
                  <li key={el.id}>{el.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className={s.menuitem__additives}>
            {dish.addons.length > 0 ? (
              <div>
                <h4 className={s.menuitem__popupTitle}>Додатки:</h4>
                {dish.addons.map((el) => (
                  <div
                    className={`${s.menuitem__popupWrapper} ${s.menuitem__popupName}`}
                    key={el.id}
                  >
                    <div className={s.menuitem__info_box}>
                      <p className={s.menuitem__additiveName}>{el.title}</p>
                      <p className={s.menuitem__additivePrice}>{+el.cost} ₴</p>
                    </div>
                    {licenseType?.isOrderOn && (
                      <div className={s.menuitem__popup_btn}>
                        <SuppleButton
                          addonsId={el.id}
                          addonsCost={el.cost}
                          addonsName={el.title}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            {licenseType?.isOrderOn && (
              <div className={s.menuitem__textareaBox}>
                <textarea
                  className={s.textarea}
                  placeholder="Коментар до кухні..."
                  value={text}
                  onChange={changeText}
                ></textarea>
              </div>
            )}
          </div>
            <Totaldish
              closePopup={closePopup}
              text={text}
              dispatchMethod={addBasket}
            />
        </div>
      </Popup>
      <div
        className={`${s.menuitem__wrapper} ${
          quantity ? `${s.menuitem__wrapper__active}` : ""
        }`}
        onClick={openPopup}
      >
        <div
          style={
            dish.img
              ? { backgroundImage: `url(${dish.img})` }
              : {
                  backgroundImage: `url('/images/menuitem/stub.jpg')`,
                }
          }
          className={s.menuitem__photo}
          
        >
          <div className={s.menuitem__serves}>
            <div>
              {dish.cookingTime ? (
                <div
                  className={`${s.menuitem__servesTime} ${s.menuitem__servesItem}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="clock">
                      <path
                        id="Vector"
                        d="M7.99998 1.33334C7.1245 1.33334 6.25759 1.50578 5.44876 1.84081C4.63992 2.17584 3.90499 2.66691 3.28593 3.28596C2.03569 4.53621 1.33331 6.2319 1.33331 8.00001C1.33331 9.76812 2.03569 11.4638 3.28593 12.7141C3.90499 13.3331 4.63992 13.8242 5.44876 14.1592C6.25759 14.4942 7.1245 14.6667 7.99998 14.6667C9.76809 14.6667 11.4638 13.9643 12.714 12.7141C13.9643 11.4638 14.6666 9.76812 14.6666 8.00001C14.6666 7.12453 14.4942 6.25762 14.1592 5.44879C13.8241 4.63995 13.3331 3.90502 12.714 3.28596C12.095 2.66691 11.36 2.17584 10.5512 1.84081C9.74236 1.50578 8.87546 1.33334 7.99998 1.33334ZM10.8 10.8L7.33331 8.66668V4.66668H8.33331V8.13334L11.3333 9.93334L10.8 10.8Z"
                        fill="#F5F5F5"
                      />
                    </g>
                  </svg>
                  <p>{dish.cookingTime} хв</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {dish.weight ? (
              <div
                className={`${s.menuitem__servesWeight} ${s.menuitem__servesItem}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="weight-gram">
                    <path
                      id="Vector"
                      d="M13.3 7.04C13.1666 6.44667 12.6333 6 12 6H10.3066C10.54 5.60667 10.6666 5.15333 10.6666 4.66667C10.6666 3.95942 10.3857 3.28115 9.8856 2.78105C9.3855 2.28095 8.70722 2 7.99998 2C7.29274 2 6.61446 2.28095 6.11436 2.78105C5.61426 3.28115 5.33331 3.95942 5.33331 4.66667C5.33331 5.15333 5.45998 5.60667 5.69331 6H3.99998C3.36665 6 2.83331 6.44667 2.69998 7.04C1.35998 12.38 1.33331 12.52 1.33331 12.6667C1.33331 13.0203 1.47379 13.3594 1.72384 13.6095C1.97389 13.8595 2.31302 14 2.66665 14H13.3333C13.6869 14 14.0261 13.8595 14.2761 13.6095C14.5262 13.3594 14.6666 13.0203 14.6666 12.6667C14.6666 12.52 14.64 12.38 13.3 7.04ZM7.99998 3.33333C8.3536 3.33333 8.69274 3.47381 8.94279 3.72386C9.19284 3.97391 9.33331 4.31304 9.33331 4.66667C9.33331 5.02029 9.19284 5.35943 8.94279 5.60948C8.69274 5.85952 8.3536 6 7.99998 6C7.64636 6 7.30722 5.85952 7.05717 5.60948C6.80712 5.35943 6.66665 5.02029 6.66665 4.66667C6.66665 4.31304 6.80712 3.97391 7.05717 3.72386C7.30722 3.47381 7.64636 3.33333 7.99998 3.33333ZM9.99998 8.66667H7.33331V11.3333H8.66665V9.33333H9.99998V12.6667H7.33331C6.59331 12.6667 5.99998 12.0733 5.99998 11.3333V8.66667C5.99998 7.92667 6.59331 7.33333 7.33331 7.33333H9.99998V8.66667Z"
                      fill="white"
                    />
                  </g>
                </svg>
                <p>{dish.weight} г</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={s.menuitem__info}>
          <div className={s.menuitem__alergenBox}>
            {dish.isAllergen ? (
              <span className={s.menuitem__alergen}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="alarm-light">
                    <path
                      id="Vector"
                      d="M4 4.60002L2.58 3.18669L3.52 2.24669L4.93333 3.66669L4 4.60002ZM8.66667 0.666687V2.66669H7.33333V0.666687H8.66667ZM13.42 3.18669L12 4.60002L11.0667 3.66669L12.48 2.24669L13.42 3.18669ZM3 7.00002V8.33335H1V7.00002H3ZM13 7.00002H15V8.33335H13V7.00002ZM4 13.3334H12C12.3536 13.3334 12.6928 13.4738 12.9428 13.7239C13.1929 13.9739 13.3333 14.3131 13.3333 14.6667H2.66667C2.66667 14.3131 2.80714 13.9739 3.05719 13.7239C3.30724 13.4738 3.64638 13.3334 4 13.3334ZM8 3.33335C9.06087 3.33335 10.0783 3.75478 10.8284 4.50493C11.5786 5.25507 12 6.27249 12 7.33335V12.6667H4V7.33335C4 6.27249 4.42143 5.25507 5.17157 4.50493C5.92172 3.75478 6.93913 3.33335 8 3.33335Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ) : (
              ""
            )}
            {dish.allergens.map( i => i.id === 1 && (
              <span key={i.id} className={s.menuitem__vegan}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="leaf">
                    <path
                      id="Vector"
                      d="M11.3333 5.33333C5.33331 6.66667 3.93331 10.78 2.54665 14.2267L3.80665 14.6667L4.43998 13.1333C4.75998 13.2467 5.09331 13.3333 5.33331 13.3333C12.6666 13.3333 14.6666 2 14.6666 2C14 3.33333 9.33331 3.5 5.99998 4.16667C2.66665 4.83333 1.33331 7.66667 1.33331 9C1.33331 10.3333 2.49998 11.5 2.49998 11.5C4.66665 5.33333 11.3333 5.33333 11.3333 5.33333Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ))}
            {dish.isSpicy ? (
              <span className={s.menuitem__spicy}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="chili-mild">
                    <path
                      id="Vector"
                      d="M13.3327 8.33341V18.3334C13.3327 18.3334 6.66602 16.6667 6.66602 9.16675V8.33341C6.66602 7.72508 6.99935 7.19175 7.49935 6.90008L8.54102 7.50008L9.99935 6.66675L11.4577 7.50008L12.4993 6.90008C12.9993 7.19175 13.3327 7.72508 13.3327 8.33341ZM9.99935 5.41675L11.4577 6.25008L12.7243 5.52508C12.266 4.71675 11.591 4.11675 10.8077 3.87508C10.6577 2.63341 9.61602 1.66675 8.33268 1.66675V3.33341C8.69935 3.33341 8.99935 3.57508 9.11602 3.90841C8.35768 4.16675 7.71602 4.75008 7.27435 5.52508L8.54102 6.25008L9.99935 5.41675Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ) : (
              ""
            )}
            {dish.isTop ? (
              <span className={s.menuitem__top}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="star">
                    <path
                      id="Vector"
                      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            ) : (
              ""
            )}
            {dish.isNew ? <span className={s.menuitem__new}>NEW</span> : ""}
            {dish.discount ? (
              <span className={s.menuitem__discount}>
                -{Math.round(100 - (dish.discount / dish.cost) * 100)}%
              </span>
            ) : (
              ""
            )}
          </div>
          <div className={s.menuitem__info_box}>
            <p className={s.menuitem__name}>{dish.name}</p>
            <div className={s.menuitem__infoItem}>
              {dish.cookingTime ? (
                <div>
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="clock">
                        <path
                          id="Vector"
                          d="M7.99998 1.33334C7.1245 1.33334 6.25759 1.50578 5.44876 1.84081C4.63992 2.17584 3.90499 2.66691 3.28593 3.28596C2.03569 4.53621 1.33331 6.2319 1.33331 8.00001C1.33331 9.76812 2.03569 11.4638 3.28593 12.7141C3.90499 13.3331 4.63992 13.8242 5.44876 14.1592C6.25759 14.4942 7.1245 14.6667 7.99998 14.6667C9.76809 14.6667 11.4638 13.9643 12.714 12.7141C13.9643 11.4638 14.6666 9.76812 14.6666 8.00001C14.6666 7.12453 14.4942 6.25762 14.1592 5.44879C13.8241 4.63995 13.3331 3.90502 12.714 3.28596C12.095 2.66691 11.36 2.17584 10.5512 1.84081C9.74236 1.50578 8.87546 1.33334 7.99998 1.33334ZM10.8 10.8L7.33331 8.66668V4.66668H8.33331V8.13334L11.3333 9.93334L10.8 10.8Z"
                          fill="#BDBDBD"
                        />
                      </g>
                    </svg>
                  </span>
                  <p>{dish.cookingTime}</p>
                </div>
              ) : (
                ""
              )}
              {dish.weight ? (
                <div>
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="weight-gram">
                        <path
                          id="Vector"
                          d="M13.3 7.04C13.1666 6.44667 12.6333 6 12 6H10.3066C10.54 5.60667 10.6666 5.15333 10.6666 4.66667C10.6666 3.95942 10.3857 3.28115 9.8856 2.78105C9.3855 2.28095 8.70722 2 7.99998 2C7.29274 2 6.61446 2.28095 6.11436 2.78105C5.61426 3.28115 5.33331 3.95942 5.33331 4.66667C5.33331 5.15333 5.45998 5.60667 5.69331 6H3.99998C3.36665 6 2.83331 6.44667 2.69998 7.04C1.35998 12.38 1.33331 12.52 1.33331 12.6667C1.33331 13.0203 1.47379 13.3594 1.72384 13.6095C1.97389 13.8595 2.31302 14 2.66665 14H13.3333C13.6869 14 14.0261 13.8595 14.2761 13.6095C14.5262 13.3594 14.6666 13.0203 14.6666 12.6667C14.6666 12.52 14.64 12.38 13.3 7.04ZM7.99998 3.33333C8.3536 3.33333 8.69274 3.47381 8.94279 3.72386C9.19284 3.97391 9.33331 4.31304 9.33331 4.66667C9.33331 5.02029 9.19284 5.35943 8.94279 5.60948C8.69274 5.85952 8.3536 6 7.99998 6C7.64636 6 7.30722 5.85952 7.05717 5.60948C6.80712 5.35943 6.66665 5.02029 6.66665 4.66667C6.66665 4.31304 6.80712 3.97391 7.05717 3.72386C7.30722 3.47381 7.64636 3.33333 7.99998 3.33333ZM9.99998 8.66667H7.33331V11.3333H8.66665V9.33333H9.99998V12.6667H7.33331C6.59331 12.6667 5.99998 12.0733 5.99998 11.3333V8.66667C5.99998 7.92667 6.59331 7.33333 7.33331 7.33333H9.99998V8.66667Z"
                          fill="#BDBDBD"
                        />
                      </g>
                    </svg>
                  </span>
                  <p>{dish.weight} г</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {dish.discount ? (
              <p className={s.menuitem__price}>
                <span className={s.menuitem__priceDiscount}>{+dish.cost} ₴</span>
                <span>{dish.discount} ₴</span>
              </p>
            ) : (
              <p className={s.menuitem__price}>{+dish.cost} ₴</p>
            )}
          </div>
          {quantity > 0 ? (
            <div className={s.menuitem__info_quantity}>
              <span>{quantity > 0 ? quantity : ""}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

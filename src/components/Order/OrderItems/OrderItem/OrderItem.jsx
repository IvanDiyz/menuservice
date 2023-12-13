import { addAddons, addDish, changeQuantity, clearState, deleteDish, updateItem } from "@/store/setOrder/setOrder";
import Buttons from "@/components/Buttons/Buttons";
import s from "./OrderItem.module.scss";
import { useEffect, useRef, useState } from "react";
import Popup from "@/components/Popup/Popup";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import SuppleButton from "@/components/SuppleButton/SuppleButton";
import Totaldish from "@/components/Menuitems/Totaldish/Totaldish";

export default function OrderItem({ dish, indexItem }) {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { items, item } = selector((state) => state.setOrder);
  const [popup, setPopup] = useState(false);
  const [text, setComment] = useState(dish.clientCooment);
  const [comment, checkHeight] = useState(false);
  const commentSpan = useRef();
  const setHeightComment = (e) => {
    if (comment) {
      checkHeight(false);
      commentSpan.current.style.height = 24 + "px";
    } else {
      checkHeight(true);
      let height = e.target.scrollHeight;
      commentSpan.current.style.height = height + "px";
    }
  };

  useEffect(() => {
    setComment(dish.clientCooment)
  }, [item,dish])


  const openPopup = (e) => {
    setPopup(true);
    document.body.style.overflow = "hidden";
    dispatch(
      addDish({
        priceDicount: dish.priceDicount,
        id: dish.id,
        quantity: dish.quantity,
        amountDish: dish.amountDish,
        isReady: false,
        dish: dish.dish,
        addons: dish.addons,
      })
    );
    dish.addons.map(el => {
      dispatch(
        addAddons({
          id: el.id,
          quantity: el.quantity,
          startAmount: el.startAmount,
          isReady: false,
          name: el.name,
        })
      )
    })
  };
  const closePopup = (e) => {
    setPopup(false);
    dispatch(clearState());
    document.body.style.overflow = "auto";
  };

  const changeText = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className={s.orderItem}>
      <Popup popup={popup} openPopup={openPopup} closePopup={closePopup}>
        <div className={s.menuitem__popupPhoto}>
          <div className={s.menuitem__serves}>
            <div>
              {dish.dish.cookingTime ? (
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

                  <p>{dish.dish.cookingTime} хв</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {dish.dish.weight ? (
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
                <p>{dish.dish.weight} г</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={s.menuitem__alergenBox}>
            {dish.dish.isAllergen ? (
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
            {dish.dish.isSpicy ? (
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
            {dish.dish.isTop ? (
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
            {dish.dish.isNew ? (
              <span className={s.menuitem__new}>NEW</span>
            ) : (
              ""
            )}
            {dish.dish.discount ? (
              <span className={s.menuitem__discount}>
                -{dish.dish.discount}%
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
              <p className={s.menuitem__name}>{dish.dish.name}</p>
              <div>
                {dish.dish.discount ? (
                  <p className={s.menuitem__price}>
                    <span className={s.menuitem__priceDiscount}>
                      {dish.dish.cost} ₴
                    </span>
                    <span>
                      {dish.dish.cost -
                        Math.ceil(dish.dish.cost * dish.dish.discount) /
                          100}{" "}
                      ₴
                    </span>
                  </p>
                ) : (
                  <p className={s.menuitem__price}>{dish.dish.cost}</p>
                )}
              </div>
            </div>
            {item.quantity ? (
              <div className={s.menuitem__info_btn}>
              <Buttons
                orderQuantity={item?.quantity}
                costDiscount={
                  dish.dish.cost -
                  Math.ceil(dish.dish.cost * dish.dish.discount) / 100
                }
                dish={dish.dish}
                addDish={addDish}
                changeQuantity={changeQuantity}
                deleteDish={deleteDish}
              />
            </div>
            ) : ''}
            
          </div>
          {dish.dish.ingredients != null ? (
            <div className={s.menuitem__popupWrapper}>
              <h4 className={s.menuitem__popupTitle}>Склад страви:</h4>
              <p className={s.menuitem__popupText}>{dish.dish.ingredients}</p>
            </div>
          ) : (
            ""
          )}
          {dish.dish.allergens.length > 0 ? (
            <div className={s.menuitem__popupWrapper}>
              <h4 className={s.menuitem__popupTitle}>Алергени:</h4>
              <ul className={s.menuitem__popupText}>
                {dish.dish.allergens.map((el) => (
                  <li key={el.id}>{el.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className={s.menuitem__additives}>
            <h4 className={s.menuitem__popupTitle}>Додатки:</h4>
            {dish.dish.addons.map((el) => (
              <div
                className={`${s.menuitem__popupWrapper} ${s.menuitem__popupName}`}
                key={el.id}
              >
                <div className={s.menuitem__info_box}>
                  <p className={s.menuitem__additiveName}>{el.title}</p>
                  <p className={s.menuitem__additivePrice}>{el.cost} ₴</p>
                </div>
                <div className={s.menuitem__popup_btn}>
                  <SuppleButton
                    addonsQuantityOrder={dish.addons.find(addon => addon.id === el.id)?.quantity || 0}
                    addonsId={el.id}
                    addonsCost={el.cost}
                    addonsName={el.title}
                  />
                </div>
              </div>
            ))}
            <div className={s.menuitem__textareaBox}>
              <textarea
                className={s.textarea}
                placeholder="Коментар до кухні..."
                value={text}
                onChange={changeText}
              ></textarea>
            </div>
          </div>
          <Totaldish indexItem={indexItem} dispatchMethod={updateItem} closePopup={closePopup} text={text} title={'Оновити замовлення'}/>
        </div>
      </Popup>
      <div className={s.orderItem__info}>
        <div className={s.orderItem__photo} onClick={openPopup}></div>
        <div className={s.orderItem__infoBox}>
          <h4 className={s.orderItem__infoTitle}>{dish.dish.name}</h4>
          {dish.clientCooment ? (
            <div className={s.orderItem__commentBox}>
              <svg
                width="14"
                height="24"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="comment-text-multiple" clipPath="url(#clip0_88_551)">
                  <path
                    id="Vector"
                    d="M1.75016 9.4261H0.583496V2.4261C0.583496 2.11668 0.706412 1.81994 0.925205 1.60115C1.144 1.38235 1.44074 1.25944 1.75016 1.25944H11.0835V2.4261H1.75016V9.4261ZM7.00016 14.0928C6.84545 14.0928 6.69708 14.0313 6.58768 13.9219C6.47829 13.8125 6.41683 13.6641 6.41683 13.5094V11.7594H4.0835C3.77408 11.7594 3.47733 11.6365 3.25854 11.4177C3.03975 11.1989 2.91683 10.9022 2.91683 10.5928V4.75944C2.91683 4.45002 3.03975 4.15327 3.25854 3.93448C3.47733 3.71569 3.77408 3.59277 4.0835 3.59277H12.2502C12.5596 3.59277 12.8563 3.71569 13.0751 3.93448C13.2939 4.15327 13.4168 4.45002 13.4168 4.75944V10.5928C13.4168 10.9022 13.2939 11.1989 13.0751 11.4177C12.8563 11.6365 12.5596 11.7594 12.2502 11.7594H9.8585L7.70016 13.9236C7.5835 14.0286 7.4435 14.0928 7.29183 14.0928H7.00016ZM5.25016 5.9261V7.09277H11.0835V5.9261H5.25016ZM5.25016 8.25944V9.4261H9.91683V8.25944H5.25016Z"
                    fill="#696969"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_88_551">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0 0.676102)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span
                onClick={setHeightComment}
                ref={commentSpan}
                style={{ height: "24px" }}
                className={s.orderItem__comment}
              >
                {dish.clientCooment}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className={s.orderItem__infoBoxBtn}>
            <Buttons
              costDiscount={dish.cost - (dish.cost * dish.discount) / 100}
              dish={dish}
              orderQuantity={dish.quantity}
              indexItem={indexItem}
              addDish={addDish}
              changeQuantity={changeQuantity}
              deleteDish={deleteDish}
            />
          </div>
          <div className={s.orderItem__infoAdditives}>
            {dish.addons.map((el) => (
              <p key={el.id} className={s.orderItem__infoAdditive}>
                {el.name} ({el.startAmount}₴) - {el.quantity}шт.
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={s.orderItem__price}>
        <span className={s.orderItem__priceItems}>{dish.amount} ₴</span>
        <span
          className={s.orderItem__priceItem}
        >{`(${dish.priceDicount}₴)`}</span>
      </div>
    </div>
  );
}

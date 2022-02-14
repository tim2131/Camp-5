import React, { useState } from "react";

import "../style/ShoppingCart.scss";
import ProductAmount from "./ProductAmount";
// 數量元件
import NumericInput from 'react-numeric-input';
import "../style/ProductAmount.scss";

// 圖片
import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";
import cartProduct from "../img/product1.jpeg";
import heartEmpty from '../img/icon/heart-empty.svg';
import heartFull from '../img/icon/heart-full.svg';

function ShoppingCart() {
    // 點愛心
    const [heart, setHeart] = useState(false);
    const toggleSwitch = () => setHeart(previousState => !previousState);

    const clickHeart = heart ? heartFull : heartEmpty;

    return (
        <>
            <main className="shopping-cart-main">
                <div className="container custom-container-width">
                    <div className="shopping-cart-title">
                        <h2 className="text-center">
                        您的訂購資訊
                        </h2>
                    </div>
                    <div className="checkout-flow d-flex justify-content-between align-items-center">
                        <h3 className="checkout-flow-cart">
                        購物車
                        </h3>
                        <div>
                            <img src={shoppingCartArrow} alt="" />
                        </div>
                        <h3 className="checkout-flow-pay">
                        付款資訊
                        </h3>
                        <div>
                            <img src={shoppingCartArrow} alt="" />
                        </div>
                        <h3 className="checkout-flow-deliver">
                        運送資訊
                        </h3>
                    </div>
                    <div className="clear-cart text-right">
                        <button>清除購物車</button>
                    </div>
                    <div className="cart-dividing-line-full"></div>

                    {/* 購物車內商品 */}
                    <div>
                        {/* 01 */}
                        <div className="cart-product row">
                            <div className="col-4">
                                <div className="cart-product-pic">
                                    <img src={cartProduct} alt="" />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="cart-content d-flex justify-content-between align-items-center">
                                    <div className="cart-producr-title">
                                        <h3>環保防水外套</h3>
                                        <h6>SKU:XXXXXXXX</h6>
                                        <h6>Color:Black</h6>
                                    </div>
                                    <div>
                                    <NumericInput
                                        // style={false}
                                        min={1} 
                                        max={100} 
                                        value={20}
                                        mobile
                                    />
                                    </div>
                                    <h3>NT$ 0</h3>
                                    <div className="d-flex">
                                        <button className="cart-remove-btn">
                                        移除
                                        </button>
                                        <button 
                                        className="cart-product-heart"
                                        onClick={ () => toggleSwitch()}
                                        >
                                            <img src={clickHeart} alt="" />
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-use-point d-flex justify-content-end align-items-center">
                                    <h3>使用10點兌換此商品嗎?</h3>
                                    <button>
                                    使用
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="cart-dividing-line-medium"></div>

                        {/* 02 */}
                        <div className="cart-product row">
                            <div className="col-4">
                                <div className="cart-product-pic">
                                    <img src={cartProduct} alt="" />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="cart-content d-flex justify-content-between align-items-center">
                                    <div className="cart-producr-title">
                                        <h3>環保防水外套</h3>
                                        <h6>SKU:XXXXXXXX</h6>
                                        <h6>Color:Black</h6>
                                    </div>
                                    <div>
                                    <NumericInput
                                        // style={false}
                                        min={1} 
                                        max={100} 
                                        value={20}
                                        mobile
                                    />
                                    </div>
                                    <h3>NT$ 0</h3>
                                    <div className="d-flex">
                                        <button className="cart-remove-btn">
                                        移除
                                        </button>
                                        <button 
                                        className="cart-product-heart"
                                        onClick={ () => toggleSwitch()}
                                        >
                                            <img src={clickHeart} alt="" />
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-use-point d-flex justify-content-end align-items-center">
                                    <h3>使用10點兌換此商品嗎?</h3>
                                    <button>
                                    使用
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="cart-dividing-line-medium"></div>
                    </div>

                    {/* 總和結帳 */}
                    <div className="row cart-total-block">
                        <div className="col">
                            <div>有促銷碼嗎?</div>
                            <div className="cart-discount-input d-flex">
                                <input></input>
                                <button>加入</button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex justify-content-between">
                                <div>商品總額</div>
                                <div>NT$4,600</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>運費</div>
                                <div>NT$0</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>折扣</div>
                                <div>－NT$60</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>促銷碼</div>
                                <div>－NT$600</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>集點兌換</div>
                                <div>－NT$600</div>
                            </div>
                            <div className="cart-dividing-line-short"></div>
                            <div className="d-flex justify-content-between">
                                <div>訂單總額</div>
                                <div>NT$33040</div>
                            </div>
                            <div>
                                <button className="cart-checkout-btn">
                                結帳
                                </button>
                            </div>
                            <div>
                                <button className="cart-continue-btn">
                                繼續購物
                                </button>
                            </div>
                            <div className="cart-point-this-time d-flex justify-content-between">
                                <div>您的本次使用集點：</div>
                                <div>20點</div>
                            </div>
                            <div className="cart-point-rest d-flex justify-content-between">
                                <div>您的剩餘集點：</div>
                                <div>90點</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShoppingCart;
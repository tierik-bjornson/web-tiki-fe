import React from "react";
import'./ProductItem.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function ProducItem({image, name, rating, price, discount, fastDelivery, sold}){
    const renderRating=()=>{
        let stars=[];
        for(let i=0; i<5; i++)
            {
                stars.push(
                    <span key={i} className={i < rating ? 'text-warning' : 'text-secondary'}>
                        &#9733
                    </span>
                )
            }
    }
    return(
        <productitem className="cart">
            <img src={image} className="cart-img-top" alt={name}/>
            <div className="card-body">
                <h5 className="cart-tittle">{name}</h5>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="text-warning">
                        {renderRating()}
                        <span className="ms-2 text-muted small">{sold} đã bán</span>
                    </div>
                    <h5 className="text-danger">{price}</h5>
                    <div className="vr mx-2"></div>
                </div>
                {discount && <p className="text-success">Giảm giá: {discount}</p>}
                {fastDelivery && <p className="text-primary">Giao hàng siêu tốc: {fastDelivery}</p>}
            </div>
        </productitem>
    );
}

export default ProducItem;
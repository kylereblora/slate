import React, { Component } from 'react'
import { Button, Rating, Divider} from 'semantic-ui-react'
import './itemdetails.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { addItemToWishlist } from '../../../store/actions/wishlistActions'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'



export class ItemDetails extends Component {
    
    handleAddToWishlist = (e) => {
        this.props.addItemToWishlist(this.props.product, this.props.auth);
    }

    render() {
        const { product, auth } = this.props;
        if (product) {
            return (
                <div className="item-site">
                    <Navbar />
                    <div className="item-details-main">
                        <div className="item-info">
                            <div className="item-two-columns">
                                <div className="item-pic">
                                    <img src={ product.itemImageUrl } alt="placeholder"/>
                                </div>
                                <div className="spacer"/>
                                <div className="item-info-2">
                                    <div>
                                        <p className="item-name">{ product.itemName }</p>
                                        <Rating icon="star" defaultRating = { product.itemRating } maxRating = {5} disabled/>                
                                        <p className="item-price">&#8369;{ product.itemPrice }</p>
                                    </div>
                                    <div>
                                        <div className="item-info-quantity">
                                            <div className="quantity">
                                                <label htmlFor="input">Quantity: </label>
                                                <input type="number" min='1' max={product.itemQuantity} placeholder='1'/>
                                            </div>
                                            <div className="add-to-wishlist">
                                                <Button fluid color='orange' onClick={this.handleAddToWishlist}>Add to Wishlist</Button>
                                            </div>
                                        </div>
                                        
                                        <Divider />
                                        
                                        <div className="item-description">
                                            <p className="item-description-header">Item Description</p>
                                            <p>{product.itemDescription}</p>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        } else {
            return (
                <div className="empty-product">
                    <p>Loading product...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const products = state.firestore.data.products
    const product = products ? products[id] : null
    return {
        product : product,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToWishlist: (product, state) => dispatch(addItemToWishlist(product, state))
    }
} 

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection : 'products' }
    ])
)(ItemDetails)

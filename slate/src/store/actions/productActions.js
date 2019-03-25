export const createProduct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            // make async call to db
            const firestore = getFirestore();
            firestore.collection('products').add({
                ...product,
                itemRating: 0,
                itemReviews: [],
                createdAt: new Date()
            }).then(() => {
                dispatch({ type: 'CREATE_PRODUCT', product});
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'CREATE_PRODUCT_ERROR', err});
            });
        })
    }
} 

export const deleteProduct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('products').doc(product.id).delete().then(() => {
            dispatch({ type: 'DELETE_PRODUCT' });
        }).catch((err) => {
            dispatch({ type: 'DELETE_PRODUCT_ERROR', err});
        })
    }
}

export const editProduct = (product, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return new Promise((resolve, reject) => {
            const firestore = getFirestore();
            firestore.collection('products').doc(product.id).set({
                itemRating:         product.itemRating,
                createdAt:          product.createdAt,
                itemReviews :       product.itemReviews,
                itemName:           state.itemName,
                itemPrice:          state.itemPrice,
                itemQuantity:       state.itemQuantity,
                itemDescription:    state.itemDescription,
                itemCategory:       state.itemCategory,
                itemImageUrl:       state.itemImageUrl,
            }).then(() => {
                dispatch({ type: 'EDIT_PRODUCT' });
            }).then(() => {
                resolve();
            }).catch((err) => {
                dispatch({ type: 'EDIT_PRODUCT_ERROR', err});
            })
        })
    }
}
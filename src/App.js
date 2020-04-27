import React from 'react'
import { useState, useEffect } from 'react'
import { css } from 'emotion'
import * as R from 'ramda'
const App = () => {
	// Constructor
	const Header = css`
	`
	const RootDesign = css`
		display: flex;
		justify-content:center;

		text-align: center;
		color: gray;
		font-family: Helvetica;
	`
	const Container = css`
		
		align-items:center;
	`

	const [items, setItems] = useState([])
	const [sortedItems, setSortedItems] = useState([])
	const [isSortAscend, setIsSortAscend] = useState(true)

	// Data Settings
	// ------------------------------
	const dummyItems = {
		productsInCart: [
			{name:'chair', price: 19},
			{name:'desk', price: 299},
			{name:'shelf', price: 59},
			{name:'pencil', price: 1},
			{name:'eraser', price: 1},
			{name:'stickynotes', price: 1},
		],
		userid: 98765,
	}

	// API Settings
	// ------------------------------
	const dummyItemsJSON = [
		JSON.stringify(dummyItems, null, 2, { type: 'application/json' }),
	]

	const dummyAPIEndpoint = URL.createObjectURL(new Blob(dummyItemsJSON))

	const fetchItemsFromAPI = async () => {
		//get Promise above
		const fetchedItems = await fetch(dummyAPIEndpoint)
		//get sresponse data
		const response = fetchedItems.json()

		//console.log(response)
		return response
		//Response(Blob) is also good for concise in specific situation
	}
	
	// Sorting Button Implementation
	// ------------------------------

	const onclicked = async () => {
		const currentItems = await fetchItemsFromAPI()
		setItems(currentItems)

		//enum target property difinition
		const PROPERTY='productsInCart'		

		let priceSorter = null
		if (isSortAscend) { 
			priceSorter = R.sortWith([R.ascend(R.prop('price')),R.ascend(R.prop('name'))])
			setIsSortAscend(!isSortAscend)
		} else {
			priceSorter = R.sortWith([R.descend(R.prop('price')),R.ascend(R.prop('name'))])			
			setIsSortAscend(!isSortAscend)
		}

		const currentSortedItems = priceSorter?.( currentItems[PROPERTY] )
		setSortedItems(currentSortedItems)
		console.table(currentSortedItems)
	}

	useEffect(() => {
		//console.table(items)
		//console.table(sortedItems)
	})

	// List Component (should be split from this file in the future)
	// ------------------------------
	const ItemList = sortedItems?.map((obj,index)=>(<li>{obj?.name} : ${obj?.price}</li>))

	// Component
	// ------------------------------
	return (
		<div className={RootDesign}>
			<div className={Container}>
				<h1>TABLE SORT</h1>
				<button onClick={onclicked}>SORT AND REFRESH</button>
				<ul>{ItemList}</ul>
			</div>
		</div>
	)
}

export default App

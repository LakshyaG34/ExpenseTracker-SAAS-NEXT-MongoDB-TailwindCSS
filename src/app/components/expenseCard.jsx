import React from "react"


const ExpenseCard = ({amount, type, date, category}) =>{
    return(
        <div>
            <span>The {type} amount is Rs{amount}</span>
            <span>The expense date is {date}</span>
            <span>The category is {category}</span>
        </div>
    )
}

export default ExpenseCard;
import React, { useEffect, useState } from "react";
import styles from './styles.module.css';



import Select from 'react-select';
import CurrencyInput from 'react-currency-masked-input';






export default function MoneyInput(props) {

    const [selectedValue, setSelectedValue] = useState([]);
    const [currencyInput, setCurrencyInput] = useState(0.0);
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState([{ value: "", label: "" }]);
    const flag = "us"
    

    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.NEXT_PUBLIC_API_KEY);
    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch("https://api.apilayer.com/currency_data/list", requestOptions)
            .then(response => response.json())
            .then(setIsLoading(true))
            .then(result => loadFlags(Object.keys(result.currencies)))
            .then(setIsLoading(false))
            .catch(error => console.log('error', error));

    }, [])

    function loadFlags(flag) {
        const localArray = [];
        flag.map((flag, i) => {
            return localArray.push({ value: flag, label: flag, image: `https://countryflagsapi.com/svg/${flag.substring(0, 2)}` });
        })
        setOptions(localArray)

    }

    function setCurrency(currencyProps) {
        
        if (options.length > 1) {
            return options.find(obj => obj.label === currencyProps).label;           
        }
        else {
            return options[0].label
        }
    }

    function currencyValue(e) {
        props.setSelectedValue(e.value)
        props.setSelectedValue(e.value)
        
    }

    



    return (
        <div className={styles.moneyWrapper}>
            <span className={styles.currencySign}>R$</span>
            <CurrencyInput
                name="money"
                disabled={props.disabled}
                className={styles.amount}
                value={props.currencyInput}
                
                placeholder={"0.00"}
                onChange={
                    (e, amount) => {
                        props.setCurrencyInput(amount);
                        props.autoCurrency(amount);
                    }} />

            <span className={styles.currencyConverterSpan}>|</span>
            
            <Select
                isLoading={isLoading}
                className={styles.selectCoin}
                id="long-value-select"
                instanceId="long-value-select"
                
                placeholder={setCurrency(props.currencyProps)}
                isSearchable={false}
                options={options}
                value={options.find(obj => obj.value === props.currencySelected)}
                onChange={(e) => currencyValue(e)}
                
                formatOptionLabel={options =>
                (<div className={styles.currencySelection}>
                    <span className={`fi fi-${flag}`}></span>
                    {/* <img src={options.image} crossorigin="anonymous" alt="options-image" className={styles.flagImage} /> */}
                    <span className={styles.label}>{options.label}</span>
                </div>)}
            />


        </div>
    );
}
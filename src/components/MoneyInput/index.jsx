import React, { useEffect, useState } from "react";
import styles from './styles.module.css';

import Image from 'next/image';

import Select from 'react-select'
import CurrencyInput from 'react-currency-masked-input'



export default function MoneyInput(props) {

    const [selectedValue, setSelectedValue] = useState([]);
    const [currencyInput, setCurrencyInput] = useState(0.0);
    const [options, setOptions] = useState([{ value: "carregando", label: "carregando..." }]);


    var myHeaders = new Headers();
    myHeaders.append("apikey", NEXT_PUBLIC_API_KEY);
    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch("https://api.apilayer.com/currency_data/list", requestOptions)
            .then(response => response.json())
            .then(result => loadFlags(Object.keys(result.currencies)))
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
        setSelectedValue(e.value)
        props.setCurrencySelected(e.value)
        
    }



    return (
        <div className={styles.currencyConverter}>
            <span className={styles.currencySign}>R$</span>
            <CurrencyInput
                name="money"
                disabled={props.disabled}
                className={styles.inputCoin}
                value={props.currencyInput}
                
                placeholder={"0.00"}
                onChange={
                    (e, amount) => {
                        props.setCurrencyInput(amount);
                        props.autoCurrency(amount);
                    }} />

            <span className={styles.currencyConverterSpan}>|</span>
            
            <Select
                className={styles.selectCoin}
                id="long-value-select"
                instanceId="long-value-select"
                placeholder={setCurrency(props.currencyProps)}
                isSearchable={false}
                options={options}
                value={options.find(obj => obj.value === selectedValue)}
                onChange={(e) => currencyValue(e)}
                
                formatOptionLabel={options =>
                (<div className={styles.currencySelection}>
                    {/* <img src={options.image} crossorigin="anonymous" alt="options-image" className={styles.flagImage} /> */}
                    <span>{options.label}</span>
                </div>)}
            />


        </div>
    );
}
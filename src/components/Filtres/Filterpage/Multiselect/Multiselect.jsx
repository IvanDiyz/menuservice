'use client'
import s from "./Multiselect.module.scss";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeFilter } from "@/store/setFilter/setFilter";

const Multiselect = ({ id, label, paramsClient }) =>{
	const dispatch = useAppDispatch();
	const [isOpen, setOpen] = useState(false);
	const [chips, setChips] = useState([]);
	

	const handleSelectChange=(e)=>{
		let values = [...e.target.selectedOptions].map(paramsClient => paramsClient.value);
		let atricle = [...e.target.selectedOptions].map(paramsClient => paramsClient.attributes);
		if(atricle[0][0].value === 'default') {
			dispatch(changeFilter({name: atricle[0][0].value, type: 'multiselect'}))
			setChips([]);
			handleCloseSelect();
			return
		}
		if(!chips.includes(values[0])) {
			const point = paramsClient.find(item => item.title === values[0]);
			const newChips = [values];
			setChips([...newChips]);
			dispatch(changeFilter({name: point.point, value: atricle[0][0].value, type: 'multiselect'}))
		}
		handleCloseSelect();
	}
	const handleRemoveChip =(chipToRemove)=>{
		const point = paramsClient.find(item => item.title === chipToRemove[0]);
		let indexOption = multiselect.current.options.selectedIndex;
		multiselect.current.options[indexOption].selected = false;
		let index = chips.indexOf(chipToRemove);
		if(index !== -1) {
			chips.splice(index, 1)
		}
		setChips([...chips]);
		dispatch(changeFilter({name: point.point, value: false, type: 'multiselect'}))
	}
	const handleCloseSelect =()=>{
		setOpen(false)
	};
	
	const selectContainer = useRef(null);
	const multiselect = useRef(null);
	  document.onclick = e => {
		
        if (selectContainer?.current) {
            const isClickInside = selectContainer.current.contains(e.target);
            if (!isClickInside) {
                handleCloseSelect();
            }
        }
    };
	
	return(
		<div className={s.editVenueFormSelectWrapper}>
			<label htmlFor={label}>{label}</label>
			<div ref={selectContainer}className={s.Drop}>
				<div className={s.Drop__Input}>
					<div className={s.Drop__Data}>
					{chips.length > 0 &&
						(chips.map(chip=>{
							
						return(
							<div className={s.Chip} key={chip}><p>{chip}</p></div>
						)
					}))
					}
					</div>
					<span className={s.editVenueArrow} onClick={()=>{setOpen(!isOpen)}}></span>
				</div>
						<select ref={multiselect} id={id} name='multiselect' className={`${s.Drop__Select} ${isOpen ?`${s.Open}`: `${s.Closed}`} `} multiple="multiple" onChange={handleSelectChange} size={paramsClient.length}>
							{paramsClient.map((option, index)=>
								(<option key={index} article={option.article} >{option.title}</option>)
							)}
						</select>
			</div>

		</div>
	)
}

export default Multiselect
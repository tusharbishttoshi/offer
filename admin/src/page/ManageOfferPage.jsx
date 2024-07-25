import React, { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { AddOffer, GetOffer, UpdateOffer } from '../api/Offer'

function ManageOfferPage() {
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch(GetOffer()).then((e) => {
            if (e.payload?.success === true) {
                if (e.payload?.offers[0] != undefined) {
                    const { _id, first_payment, second_payment, third_payment, fourth_payment } = e.payload?.offers[0];
                    setValue('id', _id)
                    setValue('first_payment', first_payment);
                    setValue('second_payment', second_payment);
                    setValue('third_payment', third_payment);
                    setValue('fourth_payment', fourth_payment);
                }
            }
        })
    }, [dispatch, setValue]);

    const onSubmit = (data) => {
        if (data.id == '') {
            dispatch(AddOffer(data)).then((e) => {
                if (e.payload?.success === true) {
                    alert("Successfully Updated");
                } else {
                    alert("Not Updated");
                }
            }).catch((error) => {
                console.error("Error updating offer:", error);
                alert("An error occurred while updating");
            });
        } else {
            dispatch(UpdateOffer(data)).then((e) => {
                if (e.payload?.success === true) {
                    alert("Successfully Updated");
                } else {
                    alert("Not Updated");
                }
            }).catch((error) => {
                console.error("Error updating offer:", error);
                alert("An error occurred while updating");
            });
        }
    };

    return (
        <>
            <div className='role' style={{ flex: "1", display: "flex" }}>
                <div className='roleContainer' style={{ overflowY: "scroll", overflowX: "hidden", height: "calc(100vh - 95px)" }}>
                    <div className='roleTop'>
                        <div className='roleTopLeft'>Offer Management</div>
                    </div>
                    <div className='roleTableContainer'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <input type='hidden' id="id" name="id" {...register('id')} />
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>First Payment</label>
                                        <input type="number" min={0} max={100} className='form-control' id='first_payment' name='first_payment' placeholder='Enter First Payment'
                                            {...register('first_payment', { required: true })}
                                        />
                                        {errors.first_payment && <p>First payment is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Second Payment</label>
                                        <input type="number" min={0} max={100} className='form-control' id='second_payment' name='second_payment' placeholder='Enter Second Payment'
                                            {...register('second_payment', { required: true })}
                                        />
                                        {errors.second_payment && <p>Second payment is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Third Payment</label>
                                        <input type="number" min={0} max={100} className='form-control' id='third_payment' name='third_payment' placeholder='Enter Third Payment'
                                            {...register('third_payment', { required: true })}
                                        />
                                        {errors.third_payment && <p>Third payment is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Fourth+ Payment</label>
                                        <input type="number" min={0} max={100} className='form-control' id='fourth_payment' name='fourth_payment' placeholder='Enter Fourth Payment'
                                            {...register('fourth_payment', { required: true })}
                                        />
                                        {errors.fourth_payment && <p>Fourth payment is required</p>}
                                    </div>
                                </div>
                            </div>
                            <button className='btn roleCreateBtn' type="submit">Update</button >
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageOfferPage

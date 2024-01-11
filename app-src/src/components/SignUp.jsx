import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TextInput from './TextInput'
import CustomButton from './CustomButton'

const SignUp = ({open, setOpen}) => {

    const dispatch = useDispatch();
    const[isNewUser, setIsNewUser] = useState(true);
    const[accountType, setAccountType] = useState('seeker');
    const [errMsg, setErrMsg] = useState("");

    //fetch from where we came to this page...
    const location = useLocation();
    let from = location?.state?.from?.pathname || '/';

    //Handle onClose and OnSubmit of the dialog box..
    const closeModal = () => setOpen(false);
    const OnSubmit = (formData) => {
        closeModal();
        console.log("#####Form Submitted Successfully !");
        console.log(formData);
    }

    //initialise the react-hook-form
    const {
        register, 
        handleSubmit,
        getValues,
        watch, 
        formState: {errors}
    } = useForm({
        mode: 'onChange'
    })

    //Creating the login Form as a Dialog Modal using headless UI
    return (
       <>
        <Transition appear show={open ?? false } as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                               {isNewUser ? 'Create Account' : 'Account SignIn'}
                            </Dialog.Title>
                            <div className='w-full flex flex-grow justify-center py-4 item-center'>
                                <button 
                                    className={`flex-1 px-4 py-2 rounded-l outline-none font-semibold ${accountType === 'seeker' ? 'bg-[#1d4fd862] text-blue-900' : 'bg-white border border-blue-400'}`}
                                    onClick={() => setAccountType('seeker')}
                                >
                                    User Account
                                </button>
                                <button 
                                    className={`flex-1 px-4 py-2 rounded-r outline-none font-semibold ${accountType === 'company' ? 'bg-[#1d4fd862] text-blue-900' : 'bg-white border border-blue-400'}`}
                                    onClick={() => setAccountType('company')}
                                >
                                    Company Account
                                </button>
                            </div>

                            <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(OnSubmit)}>
                                <TextInput 
                                    type='email'
                                    name='email'
                                    label='Email Address'
                                    placeholder='example@xyz.com'
                                    register={register('email', {
                                        required: 'Email Address is Manadatory'
                                    })}
                                    error= {errors?.email ? errors.email?.message : ''}
                                />
                                {/* For a newUser -> FirstName, lastName for a seeker and company Name for Company */}
                                {
                                    isNewUser && (
                                        <div className='w-full flex gap-1 md:gap-2'>
                                            <div className={`${accountType === 'seeker' ? 'w-1/2' : 'w-full'}`}>
                                            <TextInput 
                                                type='text'
                                                name={accountType === 'seeker' ? 'firstName' : 'companyName'}
                                                label={accountType === 'seeker' ? 'First Name' : 'Company Name'}
                                                placeholder={accountType === 'seeker' ? 'eg. John' : 'Company Name'}
                                                register={accountType === 'seeker' ? 
                                                    register('firstName', {
                                                        required: 'First Name is Manadatory'
                                                    }) : 
                                                    register('companyName', {
                                                        required: 'Company Name is Manadatory'
                                                    })
                                                }
                                                error= { accountType === 'seeker' ? 
                                                    (errors.firstName ? errors.firstName.message : '') : 
                                                        (errors.companyName ? errors.companyName.message : '')}
                                            />
                                            </div>
                                            {
                                                accountType === 'seeker' && (
                                                    <div className='w-1/2'>
                                                        <TextInput 
                                                            type='text'
                                                            name='lastName'
                                                            label='Last Name'
                                                            placeholder= 'Doe'
                                                            register={register('lastName', {
                                                                required: 'Last Name is mandatory'
                                                            })}
                                                            error= {errors.lastName ? errors.lastName.message : ''}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                {/* For all users -> passoword should be shown and For newUser -> password and confirm password for a seeker and password for Company */}
                                <div className='w-full flex gap-1 md:gap-2'>
                                    <div className={`${(isNewUser && accountType === 'seeker') ? 'w-1/2' : 'w-full'}`}>
                                        <TextInput 
                                            type='password'
                                            name='password'
                                            label='Password'
                                            placeholder='Min 8 characters'
                                            register={register('password', {
                                                required: 'Password is mandatory',
                                                minLength: {
                                                    value: 8,
                                                    message: 'Password must have min 8 Characters'
                                                }
                                            })
                                            }
                                            error= {errors.password ? errors.password.message : ''}
                                        />
                                    </div>
                                    {
                                        isNewUser && accountType === 'seeker' && (
                                            <div className='w-1/2'>
                                                    <TextInput 
                                                        type='password'
                                                        name='cpassword'
                                                        label='Confirm Password'
                                                        placeholder='Confirm Password'
                                                        register={register('cpassword', {
                                                            validate: (value) => {
                                                                const {password} = getValues();
                                                                if(value !== password) {
                                                                    return 'Password doesnot match'
                                                                }
                                                            }
                                                        })}
                                                        error= {errors.cpassword && errors.cpassword.type === 'validate' ? errors.cpassword.message : ''}
                                                    />
                                            </div>
                                        )
                                    }
                                </div>
                                {/* Handle global errMsg State */}
                                {
                                    errMsg && 
                                    <span className='text-sm text-red-500 mt-0.5' role='alert'>
                                        {errMsg}
                                    </span>
                                }
                                {/* The Submit Button */}
                                <div className='mt-2 w-full flex justify-center'>
                                    <CustomButton 
                                        type={'submit'} 
                                        title={isNewUser ? 'Register' : 'Log In'}
                                        customBtnStyle={'inline-flex justify-center rounded-md bg-blue-600 hover:bg-blue-800 px-8 py-2 text-white text-sm font-medium outine-none'}
                                    />
                                </div>
                            </form>
                            <div className='mt-4'>
                                <p className='text-sm text-gray-700'>
                                    {
                                        isNewUser ? 
                                        'Already has an account ?' :
                                        'Do not have an account'
                                    }
                                    <span 
                                        className='ml-2 text-sm text-blue-600 nl-2 hover:text-blue-700 hover:text-semibold cursor-pointer'
                                        onClick={()=>setIsNewUser(prev => !prev)}
                                    >
                                        {
                                            isNewUser ? 
                                            'Login' :
                                            'Create Account'
                                        }
                                    </span>

                                </p>
                            </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
       </>
    )
}

export default SignUp
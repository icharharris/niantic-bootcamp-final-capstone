import React, { useState, useEffect } from 'react';
import { CustomersContext, CustomersContextType } from './CustomersContext';
import { Customer } from '../models/customer';
import customerService from '../services/CustomerService'

interface Props {
    children: React.ReactNode;
}

export default function CustomersContextProvider({ children }: Props) {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchCustomers()
    }, []);

    async function fetchCustomers()
    {
        try
        {
            const customers = await customerService.getCustomers()
            setCustomers(customers)
        }
        catch (error)
        {
            console.error('Error getting customers:', error);
        }
    }

    async function addCustomer(customer: Customer)
    {
        try
        {
            const newCustomer = await customerService.addCustomer(customer)

            setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
        }
        catch (error)
        {
            console.error('Error adding customer:', error);
        }
    }

    async function updateCustomer(customer: Customer)
    {
        try
        {
            await customerService.updateCustomer(customer)
            setCustomers(prevCustomers =>
                prevCustomers.map(c => (c.customerId === customer.customerId ? customer: c))
            );
        }
        catch (error)
        {
            console.error('Error updating customer:', error);
        }
    }

    async function deleteCustomer(customerId: number)
    {
        try
        {
            await customerService.deleteCustomer(customerId)

            setCustomers(prevCustomers => prevCustomers.filter(customer => customer.customerId !== customerId));
        }
        catch (error)
        {
            console.error('Error deleting customer:', error);
        }
    };

    async function refreshCustomers()
    {
        await fetchCustomers()
    };

    const contextValue: CustomersContextType = {
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        refreshCustomers
    };

    return <CustomersContext.Provider value={contextValue}>{children}</CustomersContext.Provider>;
};
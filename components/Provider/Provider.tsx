'use client'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { store } from '../redux/store/store'
import { Provider } from 'react-redux'
import { ConfigProvider, theme } from 'antd'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ClerkProvider>
            <ConfigProvider
                theme={{
                    // 1. Use dark algorithm
                    algorithm: theme.darkAlgorithm,

                    // 2. Combine dark algorithm and compact algorithm
                    // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                }}
            >
                <Provider store={store}>
                    {children}
                </Provider>
            </ConfigProvider>

        </ClerkProvider>

    )
}

export default Providers
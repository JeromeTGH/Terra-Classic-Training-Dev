import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import PageAccueil from './pages/PageAccueil';
import PageAccount from './pages/PageAccount';
import PageBlock from './pages/PageBlock';
import Page404 from './pages/Page404';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" exact element={<PageAccueil />} />
                <Route path="/account" >
                    <Route path="" element={<PageAccount />} />
                    <Route path=":cptNum" element={<PageAccount />} />
                </Route>
                <Route path="/block">
                    <Route path="" element={<PageBlock />} />
                    <Route path=":blockNum" element={<PageBlock />} />
                </Route>
                <Route path="/404" exact element={<Page404 />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Terra1accountFinder from './Terra1accountFinder';
import LatestBlockInfo from './LatestBlockInfo';

import PageAccueil from './PageAccueil';
import Page404 from './Page404';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<PageAccueil />} />
                <Route path="/terra1accountfinder" exact element={<Terra1accountFinder />} />
                <Route path="/latestblockinfo" exact element={<LatestBlockInfo />} />
                <Route path="/404" exact element={<Page404 />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
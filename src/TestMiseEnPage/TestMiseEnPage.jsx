import React from 'react';
import styles from './TestMiseEnPage.module.scss';

const TestMiseEnPage = () => {
    return (
        <div className={styles.appContainer}>
            <div className={styles.sidebarContainer}>
                <div className={styles.insideBar1}>
                    1
                </div>
                <div className={styles.insideBar2}>
                    2
                </div>
                <div className={styles.insideBar3}>
                    3
                </div>
                <div className={styles.insideBar4}>
                    4
                </div>
            </div>
            <div className={styles.appbarContainer}>Appbar</div>
            <div className={styles.appContent}>
                <div className={styles.sousContent}>
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <div className={styles.sousContent}>
                    ddd
                    <br />
                    <br />
                </div>
                <div className={styles.sousContent}>
                    <table>
                        <tbody>
                            <tr>
                                <td>545454545455454545545454545</td>
                                <td>cccccccccccccccccccccccccccccccccccccccccccccccccccc</td>
                                <td>545455454545545454554545454545</td>
                                <td>cccccccccccccccccccccccccccccccccccccccccccccccccccc</td>
                                <td>545454544545454454545454545</td>
                                <td>cccccccccccccccccccccccccccccccccccccccccccccccccccc</td>
                                <td>54545454554545545454545</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TestMiseEnPage;
import React from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import Pdftable from './Addpdf/Pdftable';
import Userguideveido from './userguidevideo/Userguideveido';
import { useTranslation } from 'react-i18next';
const Userguide = () => {

    const { t } = useTranslation();
    return (
        <div>
            <div className="p-0 h-full sm:ml-72">
                <div>
                    <DashboardRightHeader
                        title={`${t('User Guide')}`}
                    />
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-4 justify-center items-center">
                    <div className="col-span-6 sm:col-span-6 h-auto w-full p-4 bg-white shadow-xl rounded-md mt-8">
                        <Pdftable/>
                    </div>
                    <div className="col-span-6 sm:col-span-6 h-auto w-full p-4 bg-white shadow-xl rounded-md mt-8">
                        <Userguideveido/>
                    </div>
                </div>

               
            </div>
        </div>
    )
}

export default Userguide
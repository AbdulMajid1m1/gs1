import React from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'

const MemberDashboard = () => {
  return (
    <div>
       <div className="h-full sm:ml-72">
          <div>
            <DashboardRightHeader 
              title={'Dashboard'}
            />
          </div>
       </div>
    </div>
  )
}

export default MemberDashboard
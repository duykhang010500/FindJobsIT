import { useRoutes } from 'react-router-dom';

//employer routes
import Login from '../pages/auth/employer/Login';
import JobSeekerLayout from '../layouts/JobSeeker';
import Register from '../pages/auth/employer/Register';
import EmployerMainLayout from '../layouts/EmployerMainLayout';
import EmployerHomePage from '../pages/employer/EmployerHomePage';
import Statistics from '../sections/employer-dashboard/Statistics';
import EmployerCreateJob from '../pages/employer/jobs/EmployerCreateJob';
import EmployerDashboardLayout from '../layouts/EmployerDashboardLayout';

//job seeker routes
import Home from '../pages/Home';
import PageNotFound from '../pages/404';
import Services from '../pages/Services';
import JobDescription from '../pages/JobDetails';

//admin
import AdminLayout from '../layouts/AdminLayout';
import DashboardAdmin from '../pages/admin/dashboard';
import CompanyList from '../pages/admin/CompaniesList';
import AdminLogin from '../pages/auth/admin/AdminLogin';
import ServicesPage from '../pages/admin/services/ServicesPage';
import EmployerJobsOpen from '../pages/employer/jobs/EmployerJobsOpen';
import EmployerServices from '../pages/employer/services/EmployerServices';
import EmployerCandidatesList from '../pages/employer/candidates/EmployerCandidatesList';
import OrdersPage from '../pages/admin/services/OrdersPage';
import LocationPage from '../pages/admin/settings/LocationPage';
import IndustriesPage from '../pages/admin/settings/IndustriesPage';
import DegreesPage from '../pages/admin/settings/DegreesPage';
import LevelPage from '../pages/admin/settings/LevelPage';
import JobSeekerLogin from '../pages/auth/jobseeker/JobSeekerLogin';
import JobSeekerRegister from '../pages/auth/jobseeker/JobSeekerRegister';
import CreateService from '../pages/admin/services/CreateService';
import AdminCandidatesPage from '../pages/admin/candidates/AdminCandidatesPage';
import MyProfile from '../pages/employer/settings/MyProfile';
import CompanyProfile from '../pages/employer/settings/CompanyProfile';
import JobSeekerDashboardLayout from '../layouts/JobSeekerDashboard';
import JobSeekerDashboardPage from '../pages/jobseeker/JobSeekerDashboard';
import JobSeekerProfile from '../pages/jobseeker/JobSeekerProfile';
import JobSeekerJobs from '../pages/jobseeker/JobSeekerJobs';
import JobSeekerSettings from '../pages/jobseeker/JobSeekerSettings';
import SearchJobs from '../pages/SearchJobs';
import DetailCandidate from '../sections/employer-dashboard/candidates/DetailCandidate';
import SearchCandidates from '../pages/employer/SearchCondidates';
import EmployerViewProfileCandidate from '../pages/employer/candidates/EmployerViewProfileCandidate';
import JobSaved from '../pages/jobseeker/JobSeekerJobs/JobSaved';
import EmployerCandidateSaved from '../pages/employer/candidates/EmployerCandidateSaved';
import ViewResume from '../pages/jobseeker/ViewResume';
import ForgotPassword from '../pages/auth/common/ForgotPassword';
import ResetPassword from '../pages/auth/common/ResetPassword';
import EmployerCheckout from '../pages/employer/EmployerCheckout';
import EmployerCandidateHistorySentMail from '../pages/employer/candidates/EmployerCandidateHistorySentMail';
import EmployerOrderSuccess from '../pages/employer/EmployerOrderSuccess';
import PaymentSuccess from '../pages/employer/PaymentSuccess';
import JobsPending from '../pages/admin/Jobs/JobsPending';
import JobsActive from '../pages/admin/Jobs/JobsActive';
import JobsReject from '../pages/admin/Jobs/JobsReject';

type Props = {};

const Router = (props: Props) => {
  return useRoutes([
    { element: <AdminLogin />, path: 'admin/login' },
    {
      path: '/',
      element: <JobSeekerLayout />,
      children: [
        { element: <Home />, index: true },
        { path: 'register', element: <JobSeekerRegister /> },
        { path: 'login', element: <JobSeekerLogin /> },
        { path: 'job/:id', element: <JobDescription /> },
        { path: 'company/:id' },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        {
          path: 'my',
          element: <JobSeekerDashboardLayout />,
          children: [
            { path: 'jobs', element: <JobSeekerJobs /> },
            { path: 'jobs/saved', element: <JobSaved /> },
            { path: 'profile', element: <JobSeekerProfile /> },
            { path: 'settings', element: <JobSeekerSettings /> },
            { path: 'dashboard', element: <JobSeekerDashboardPage /> },
          ],
        },
        { path: 'search', element: <SearchJobs /> },
        { path: 'view-resume', element: <ViewResume /> },
      ],
    },

    {
      path: 'employer',
      element: <EmployerMainLayout />,
      children: [
        { element: <Login />, path: 'login' },
        { element: <Register />, path: 'register' },
        { element: <EmployerHomePage />, index: true },
        { element: <ForgotPassword />, path: 'forgot-password' },
        { element: <ResetPassword />, path: 'reset-password' },
        { path: 'services', element: <Services /> },
        {
          path: 'services/order-success/:id',
          element: <EmployerOrderSuccess />,
        },
        { path: 'vnpay_return', element: <PaymentSuccess /> },
        { path: 'services/checkout', element: <EmployerCheckout /> },
        { path: 'candidates/search', element: <SearchCandidates /> },
        { path: 'candidates/:id', element: <EmployerViewProfileCandidate /> },
      ],
    },
    {
      path: 'employer/hr',
      element: <EmployerDashboardLayout />,
      children: [
        { path: 'my', element: <MyProfile /> },
        { path: 'dashboard', element: <Statistics /> },
        { path: 'company', element: <CompanyProfile /> },
        { path: 'jobs/active', element: <EmployerJobsOpen /> },
        { path: 'job/create', element: <EmployerCreateJob /> },
        { path: 'order/active', element: <EmployerServices /> },
        { path: 'job/:id/edit', element: <EmployerCreateJob /> },
        { path: 'candidates/:id', element: <DetailCandidate /> },
        { path: 'candidates', element: <EmployerCandidatesList /> },
        { path: 'saved-candidates', element: <EmployerCandidateSaved /> },
        {
          path: 'mails',
          element: <EmployerCandidateHistorySentMail />,
        },
      ],
    },
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        { path: 'dashboard', element: <DashboardAdmin /> },

        //companies
        { path: 'companies', element: <CompanyList /> },
        { path: 'companies/jobs' },

        //jobs
        { path: 'jobs/pending', element: <JobsPending /> },
        { path: 'jobs/active', element: <JobsActive /> },
        { path: 'jobs/reject', element: <JobsReject /> },

        //candidates
        { path: 'candidates/list', element: <AdminCandidatesPage /> },

        //services
        { path: 'services/orders', element: <OrdersPage /> },
        { path: 'services/list', element: <ServicesPage /> },
        { path: 'services/new', element: <CreateService /> },
        { path: 'services/:id/edit', element: <CreateService /> },

        //settings
        { path: 'settings/location', element: <LocationPage /> },
        { path: 'settings/industries', element: <IndustriesPage /> },
        { path: 'settings/degree', element: <DegreesPage /> },
        { path: 'settings/level', element: <LevelPage /> },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);
};

export default Router;

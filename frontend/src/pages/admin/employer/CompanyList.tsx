import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CSVLink, CSVDownload } from 'react-csv';

import {
  Card,
  Table,
  Avatar,
  Stack,
  Switch,
  Tooltip,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  TableContainer,
  TablePagination,
} from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import Nodata from '../../../components/Nodata';
import DetailCompanyDialog from './DetailCompanyDialog';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import {
  adminUpdateCompanyStatus,
  openCompanyDialog,
} from '../../../store/companies/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { TableRestaurant } from '@mui/icons-material';
import { Skeleton } from '@mui/lab';

type Props = {
  companies: any;
};

const CompanyList = ({ companies }: Props) => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const [keyword, setKeyword] = useState<string>('');

  const [exportData, setExportData] = useState<any>([]);

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);

  const { isLoading } = useSelector((state: AppState) => state.companies);

  const handleClose = () => {
    setOpenDetail(false);
  };

  const isActive = pathname.includes('active');
  const isRejected = pathname.includes('rejected');
  const isRequested = pathname.includes('requested');

  const handleChangeStatus = (compID: number) => {
    if (isRequested) {
      dispatch(adminUpdateCompanyStatus(compID, 1));
    }
    if (isActive) {
      dispatch(adminUpdateCompanyStatus(compID, 3));
    }
    if (isRejected) {
      dispatch(adminUpdateCompanyStatus(compID, 1));
    }
  };

  const filteredCompany = filterCompany(companies, keyword);

  useEffect(() => {
    setExportData(formatData(companies));
  }, [companies]);

  const formatData = (arr: any) => {
    let newArr: any = [];
    arr?.forEach((item: any, index: number) => {
      newArr.push({
        STT: `${index + 1}`,
        Company_name: `${item?.name}`,
        Contact_email: `${item?.employer?.email}`,
        Phone: `${item?.phone || ''}`,
        Company_size: `${item?.company_size}`,
        Website: `${item?.website || ''}`,
        Location: `${item?.location_name}`,
      });
    });
    return newArr;
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <TextField
          value={keyword}
          placeholder='Search company...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e: any) => setKeyword(e.target.value)}
        />
        <Button variant='contained'>
          <CSVLink
            data={exportData}
            style={{ textDecoration: 'unset', color: 'inherit' }}
          >
            Export
          </CSVLink>
        </Button>
      </Stack>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell align='left'>contact Email</TableCell>
              <TableCell align='left'>contact name</TableCell>
              <TableCell align='left'>Status </TableCell>
              <TableCell align='center'>actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              </>
            )}
            {!isLoading && filteredCompany.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              filteredCompany?.map((company: any) => (
                <TableRow key={company?.id}>
                  <TableCell>
                    <Avatar
                      variant='rounded'
                      src={company?.logo}
                      sx={{
                        width: 75,
                        height: 75,
                        '& > img': {
                          objectFit: 'unset',
                        },
                      }}
                    />
                    {/* <img
                      src={company?.logo}
                      alt=''
                      style={{ width: '50px', height: '50px' }}
                    /> */}
                  </TableCell>

                  <TableCell>
                    {dayjs(company?.created_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{company?.name}</TableCell>
                  <TableCell align='left'>{company?.employer?.email}</TableCell>
                  <TableCell align='left'>
                    {company?.employer?.fullname}
                  </TableCell>
                  <TableCell align='left'>
                    <Switch
                      defaultChecked={company?.status === 1}
                      onChange={() => handleChangeStatus(company.id)}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Tooltip placement='bottom' title='View detail'>
                      <IconButton
                        onClick={() => {
                          setSelectedCompany(company);
                          setOpenDetail(true);
                          dispatch(openCompanyDialog());
                        }}
                      >
                        <VisibilityTwoToneIcon sx={{ color: '#69b1ff' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={filteredCompany.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
        />
        <DetailCompanyDialog
          onOpen={openDetail}
          onClose={handleClose}
          company={selectedCompany}
        />
      </TableContainer>
    </Card>
  );
};

const filterCompany = (companies: any, keyword: string) => {
  const filteredCompanies = companies.filter((company: any) =>
    company.name.toLowerCase().includes(keyword.toLowerCase())
  );
  return filteredCompanies;
};

export default CompanyList;

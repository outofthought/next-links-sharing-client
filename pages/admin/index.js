// import Layout from "../../components/Layout"
// import withAdmin from '../withAdmin'

// const Admin = ({ user, token }) => <Layout>{JSON.stringify(user, token)}</Layout>

// export default withAdmin(Admin)

// after category create
import Layout from '../../components/Layout';
import withAdmin from '../withAdmin';
import Link from 'next/link';

const Admin = ({ user }) => (
  <Layout>
    <h1>Admin Dashboard</h1>

    <br />
    <div className="row">
      <div className="col-md-4">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/admin/category/create">
              <a className="nav-link">Create category</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/categories">
              <a className="nav-link">Categories</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/links">
              <a className="nav-link">Links</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-md-8"></div>
    </div>
    <pre>{JSON.stringify(user, undefined, 2)}</pre>
  </Layout>
);

export default withAdmin(Admin);

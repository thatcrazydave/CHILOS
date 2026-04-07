import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar/AdminSidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

import { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import './App.css'
import { Html5QrcodeScanner } from 'html5-qrcode'
function App() {
const [showScanner, setShowScanner] = useState(false)
const [scannedMedicine, setScannedMedicine] = useState(null)
const [currentDateTime, setCurrentDateTime] = useState(new Date())
const [isClockedIn, setIsClockedIn] = useState(false)
const [clockInTime, setClockInTime] = useState(null)
const [showAddProduct, setShowAddProduct] = useState(false)
const [newMedicineName, setNewMedicineName] = useState('')
const [newMedicineCategory, setNewMedicineCategory] = useState('Tablets')
const [newMedicinePrice, setNewMedicinePrice] = useState('')
const [newMedicineStock, setNewMedicineStock] = useState('')
const [currentPage, setCurrentPage] = useState('dashboard')
const [selectedCategory, setSelectedCategory] = useState('All')
const [cartItems, setCartItems] = useState([])
const [sales, setSales] = useState([])
const [editingMedicineId, setEditingMedicineId] = useState(null)
const [categories, setCategories] = useState([
  { id: 1, name: 'Tablets' },
  { id: 2, name: 'Syrups' },
  { id: 3, name: 'Injections' },
  { id: 4, name: 'Capsules' },
  { id: 5, name: 'Other' }
])
const [categorySearch, setCategorySearch] = useState('')
const [suppliers, setSuppliers] = useState([
  {
    id: 1,
    supplierName: 'Ali Traders',
    companyName: 'Ali Pharma Distributors',
    contactPerson: 'Ali Ahmed',
    phone: '03001234567',
    email: 'ali@example.com',
    address: 'Main Market',
    city: 'Gujrat',
    country: 'Pakistan',
    taxNumber: 'TX-1001',
    notes: 'Medicine supplier'
  },
  {
    id: 2,
    supplierName: 'Health Care Suppliers',
    companyName: 'Health Care Pharma',
    contactPerson: 'Usman Khan',
    phone: '03009876543',
    email: 'health@example.com',
    address: 'Model Town',
    city: 'Lahore',
    country: 'Pakistan',
    taxNumber: 'TX-1002',
    notes: 'Wholesale medicines'
  },
  {
    id: 3,
    supplierName: 'Medico Traders',
    companyName: 'Medico Distributors',
    contactPerson: 'Ahmed Raza',
    phone: '03111222333',
    email: 'medico@example.com',
    address: 'Satellite Town',
    city: 'Rawalpindi',
    country: 'Pakistan',
    taxNumber: 'TX-1003',
    notes: 'Pharmaceutical products'
  }
])
const [showAddSupplier, setShowAddSupplier] = useState(false)

const [supplierForm, setSupplierForm] = useState({
  supplierName: '',
  companyName: '',
  contactPerson: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  country: '',
  taxNumber: '',
  notes: ''
})
const [supplierSearch, setSupplierSearch] = useState('')
const [editingSupplierId, setEditingSupplierId] = useState(null)
const [viewSupplier, setViewSupplier] = useState(null)
const [deleteSupplierId, setDeleteSupplierId] = useState(null)
const [customers, setCustomers] = useState([
  {
    id: 1,
    customerName: 'Ali Ahmed',
    phone: '03001234567',
    email: 'ali@gmail.com',
    city: 'Gujrat',
    address: 'Main Bazar, Gujrat',
    notes: 'Regular Customer',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    customerName: 'Sara Khan',
    phone: '03111234567',
    email: 'sara@gmail.com',
    city: 'Lahore',
    address: 'Model Town, Lahore',
    notes: 'Regular Customer',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    customerName: 'Ahmed Raza',
    phone: '03221234567',
    email: 'ahmed@gmail.com',
    city: 'Islamabad',
    address: 'F-10, Islamabad',
    notes: 'New Customer',
    createdAt: new Date().toISOString()
  }
])
const [customerSearch, setCustomerSearch] = useState('')

const [customerForm, setCustomerForm] = useState({
  customerName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  notes: ''
})

const [editingCustomerId, setEditingCustomerId] = useState(null)
const [viewCustomer, setViewCustomer] = useState(null)
const [deleteCustomerId, setDeleteCustomerId] = useState(null)
const [customerPage, setCustomerPage] = useState('Dashboard')
const [adminName, setAdminName] = useState('Admin')
const [adminEmail, setAdminEmail] = useState('admin@pharmacare.com')
const [adminImage, setAdminImage] = useState('')
const [savedAdminImage, setSavedAdminImage] = useState('')
const [savedAdminName, setSavedAdminName] = useState('Admin')
const [savedAdminEmail, setSavedAdminEmail] = useState('admin@pharmacare.com')
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const [notifications, setNotifications] = useState([
  {
    id: 1,
    message: {
      English: 'Low stock medicine alert',
      Urdu: 'ادویات کا اسٹاک کم ہونے کی اطلاع',
      Spanish: 'Alerta de medicamentos con poco stock'
    }
  },
  {
    id: 2,
    message: {
      English: 'Medicine expiry alert',
      Urdu: 'ادویات کی میعاد ختم ہونے کی اطلاع',
      Spanish: 'Alerta de caducidad de medicamentos'
    }
  }
])
const [showNotifications, setShowNotifications] = useState(false)
const [language, setLanguage] = useState('English')
const [showLanguages, setShowLanguages] = useState(false)
const [showProfile, setShowProfile] = useState(false)
const [showMyProfile, setShowMyProfile] = useState(false)
const [showResetPassword, setShowResetPassword] = useState(false)
const [showHelp, setShowHelp] = useState(false)
const [showSystemChecker, setShowSystemChecker] = useState(false)
const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
const [selectedPeriod, setSelectedPeriod] = useState('Today')
const [showExportOptions, setShowExportOptions] = useState(false)
const [activePage, setActivePage] = useState('Dashboard')
// BACKUP SETTINGS
const [automaticBackup, setAutomaticBackup] = useState(
  localStorage.getItem('automaticBackup') === 'true'
)

const [lastBackup, setLastBackup] = useState(
  localStorage.getItem('lastBackup') || null
)
const handleAutomaticBackup = (checked) => {
  setAutomaticBackup(checked)

  if (checked) {
    localStorage.setItem('automaticBackup', 'true')
  } else {
    localStorage.setItem('automaticBackup', 'false')
  }
}
const handleManualBackup = () => {
  const backupData = {
    medicines,
    cartItems,
    sales,
    categories,
    suppliers,
    customers
  }

  const blob = new Blob(
    [JSON.stringify(backupData, null, 2)],
    { type: 'application/json' }
  )

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'PharmaCare-Backup.json'
  link.click()

  URL.revokeObjectURL(url)
  setLastBackup(new Date().toLocaleString())
}
const [searchMedicine, setSearchMedicine] = useState('')
const [medicineSearch, setMedicineSearch] = useState('')
const translations = {
 English: {
  dashboard: 'Dashboard',
  medicineManagement: 'Medicine Management',
  categories: 'Categories',
  suppliers: 'Suppliers',
  customers: 'Customers',
  purchases: 'Purchase Management',
  sales: 'Sales',
  stock: 'Stock Management',
  expiry: 'Expiry Management',
  expenses: 'Expenses',
  reports: 'Reports',
  notifications: 'Notifications',
  settings: 'Settings',
  settingsDescription: 'Manage your Pharma Care system settings',
  adminProfile: 'Admin Profile',
adminProfileDescription: 'Manage admin account details and profile',
manage: 'Manage',
  pharmacyDashboard: 'Pharmacy Dashboard',
  welcomeMessage: "Welcome back! Here's what's happening in your pharmacy.",
  mainMenu: 'MAIN MENU',
  managementSystem: 'Management System',
  adminProfile: 'Admin Profile',
  administrator: 'Administrator',
  close: 'Close',
  clearAll: 'Clear All',
  noNewNotifications: 'No new notifications',
  myProfile: 'My Profile',
resetPassword: 'Reset Password',
help: 'Help',
systemChecker: 'System Checker',
logout: 'Logout',
currentPassword: 'Current Password',
newPassword: 'New Password',
confirmPassword: 'Confirm New Password',
savePassword: 'Save Password',
fillAllFields: 'Please fill all password fields.',
passwordMismatch: 'New password and confirm password do not match.',
passwordLength: 'Password must be at least 6 characters.',
passwordSuccess: 'Password validation successful! Backend will be connected later.',
helpWelcome: 'Welcome to Pharma Care Help Center.',
helpDescription: 'Here you can get assistance with:',
helpMedicine: 'Medicine Management',
helpStock: 'Stock Management',
helpSales: 'Sales and Purchases',
helpExpiry: 'Expiry Management',
helpReports: 'Reports',
// Dashboard
totalMedicines: 'Total Medicines',
totalSales: 'Total Sales',
totalCustomers: 'Total Customers',
lowStock: 'Low Stock',
today: 'Today',
thisWeek: 'This Week',
thisMonth: 'This Month',
thisYear: 'This Year',
custom: 'Custom',
export: 'Export',
exportPDF: 'Export PDF',
exportExcel: 'Export Excel',
lowStockAlert: 'Low Stock Alert',
checkStock: 'Check Stock',
recentActivity: 'Recent Activity',
salesOverview: 'Sales Overview',
medicineOverview: 'Medicine Overview',
noRecentActivity: 'No recent activity',
welcomeBack: 'Welcome Back',
todayRevenue: "Today's Revenue",
todayTotalSales: "Today's total sales",
medicinesInventory: 'Medicines in inventory',
registeredCustomers: 'Registered customers',
totalSuppliers: 'Total Suppliers',
registeredSuppliers: 'Registered suppliers',
averageSale: 'Average Sale',
perTransaction: 'Per transaction',
totalTransactions: "Today's transactions",
itemsSold: 'Items Sold',
totalUnitsSold: 'Total units sold',
grossProfit: 'Gross Profit',
beforeExpenses: 'Before expenses',
lowStockMessage: '2 medicines are below their reorder level.',
salesDescription: 'Monitor your pharmacy sales performance',
last7Days: 'Last 7 Days',
last30Days: 'Last 30 Days',
mon: 'Mon',
tue: 'Tue',
wed: 'Wed',
thu: 'Thu',
fri: 'Fri',
sat: 'Sat',
sun: 'Sun',
week1: 'Week 1',
week2: 'Week 2',
week3: 'Week 3',
week4: 'Week 4',
categorySales: 'Category Sales',
salesByCategory: 'Sales by medicine category',
tablets: 'Tablets',
syrups: 'Syrups',
injections: 'Injections',
otherMedicines: 'Other Medicines',
recentActivityDescription: 'Latest activities in your pharmacy',
newSaleCompleted: 'New Sale Completed',
saleCompletedMessage: 'Medicine sale transaction completed successfully.',
stockUpdated: 'Stock Updated',
stockUpdatedMessage: 'Medicine inventory information updated.',
newCustomerRegistered: 'New Customer Registered',
customerRegisteredMessage: 'A new customer was added to the system.',
posTitle: 'Pharmacy POS',
posDescription: 'Search and add medicines to current order',
searchMedicines: 'Search medicines...',
allMedicines: 'All Medicines',
tablets: 'Tablets',
syrups: 'Syrups',
injections: 'Injections',
other: 'Other',
currentOrder: 'Current Order',
noMedicines: 'No medicines added yet',
addToCart: 'Add to Cart',
posHeading: 'POS / Sales',
productCategory: 'Product Category',
totalProducts: 'Total Products',
inventoryValue: 'Inventory Value',
sold: 'Sold',
alert: 'Alert',
addProduct: 'Add Product',
inventory: 'Inventory',
medicineName: 'Medicine Name',
category: 'Category',
price: 'Price',
stock: 'Stock',
saveProduct: 'Save Product',
subtotal: 'Subtotal',
total: 'Total',
checkout: 'Checkout',
pleaseAddMedicines: 'Please add medicines to cart first!',
saleCompleted: 'Sale completed successfully!',
addMedicine: 'Add Medicine',
medicineId: 'Medicine ID',
manufacturer: 'Manufacturer',
purchasePrice: 'Purchase Price',
sellingPrice: 'Selling Price',
quantity: 'Quantity',
expiryDate: 'Expiry Date',
medicineImage: 'Medicine Image',
description: 'Description',
saveMedicine: 'Save Medicine',
reset: 'Reset',
cancel: 'Cancel',
back: 'Back',
selectCategory: 'Select Category',
medicineAdded: 'Medicine added successfully!',
scanMedicine: 'Scan Medicine',
closeScanner: 'Close Scanner',
barcode: 'Barcode',
qrCode: 'QR Code',
scanning: 'Scanning...',
requestCameraPermission: 'Request Camera Permission',
medicineFound: 'Medicine Found',
medicineNotFound: 'Medicine Not Found',
scannedCode: 'Scanned Code',
fillMedicineFields: 'Please fill in all required fields.',
addCategory: 'Add Category',
categoryName: 'Category Name',
categoryExists: 'Category already exists!',
totalCategories: 'Total Categories',
categoryMedicines: 'Category Medicines',
backToCategories: 'Back to Categories',
noMedicinesInCategory: 'No medicines found in this category',
supplierName: 'Supplier Name',
companyName: 'Company Name',
contactPerson: 'Contact Person',
phoneNumber: 'Phone Number',
emailAddress: 'Email Address',
fullAddress: 'Full Address',
city: 'City',
country: 'Country',
taxNumber: 'Tax / Registration Number',
notes: 'Notes',
addSupplier: 'Add Supplier',
editSupplier: 'Edit Supplier',
supplierDetails: 'Supplier Details',
searchSupplier: 'Search Supplier...',
totalSuppliers: 'Total Suppliers',
saveSupplier: 'Save Supplier',
updateSupplier: 'Update Supplier',
deleteSupplier: 'Delete Supplier',
noSuppliersFound: 'No Suppliers Found',
adminName: 'Admin Name',
adminEmail: 'Email Address',
saveChanges: 'Save Changes',
back: 'Back',
cancel: 'Cancel',
profileSaved: 'Profile saved successfully!',
automaticBackup: 'Automatic Backup',
automaticBackupDescription: 'Automatically save your app data',
enableAutomaticBackup: 'Enable Automatic Backup',
lastBackup: 'Last Backup',
},

  Urdu: {
  dashboard: 'ڈیش بورڈ',
  medicineManagement: 'ادویات کا انتظام',
  categories: 'اقسام',
  suppliers: 'سپلائرز',
  customers: 'گاہک',
  purchases: 'خریداری کا انتظام',
  sales: 'فروخت',
  stock: 'اسٹاک کا انتظام',
  expiry: 'میعاد کا انتظام',
  expenses: 'اخراجات',
  reports: 'رپورٹس',
  notifications: 'اطلاعات',
  settings: 'ترتیبات',
  settingsDescription: 'اپنے فارما کیئر سسٹم کی ترتیبات کا انتظام کریں',
  adminProfile: 'ایڈمن پروفائل',
adminProfileDescription: 'ایڈمن اکاؤنٹ کی معلومات اور پروفائل تبدیل کریں',
manage: 'انتظام کریں',
  pharmacyDashboard: 'فارمیسی ڈیش بورڈ',
  welcomeMessage: 'خوش آمدید! آپ کی فارمیسی کی تازہ صورتحال',
  mainMenu: 'مین مینو',
  managementSystem: 'انتظامی نظام',
  adminProfile: 'ایڈمن پروفائل',
administrator: 'منتظم',
close: 'بند کریں',
clearAll: 'سب ختم کریں',
noNewNotifications: 'کوئی نئی اطلاع نہیں',
myProfile: 'میری پروفائل',
resetPassword: 'پاس ورڈ تبدیل کریں',
help: 'مدد',
systemChecker: 'سسٹم چیکر',
logout: 'لاگ آؤٹ',
currentPassword: 'موجودہ پاس ورڈ',
newPassword: 'نیا پاس ورڈ',
confirmPassword: 'نئے پاس ورڈ کی تصدیق',
savePassword: 'پاس ورڈ محفوظ کریں',
fillAllFields: 'براہ کرم تمام خانے پُر کریں۔',
passwordMismatch: 'نیا پاس ورڈ اور تصدیقی پاس ورڈ ایک جیسے نہیں ہیں۔',
passwordLength: 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے۔',
passwordSuccess: 'پاس ورڈ کی جانچ کامیاب ہوگئی!',
helpWelcome: 'فارما کیئر ہیلپ سینٹر میں خوش آمدید۔',
helpDescription: 'آپ یہاں ان موضوعات میں مدد حاصل کر سکتے ہیں:',
helpMedicine: 'ادویات کا انتظام',
helpStock: 'اسٹاک کا انتظام',
helpSales: 'فروخت اور خریداری',
helpExpiry: 'میعاد کا انتظام',
helpReports: 'رپورٹس',
// Dashboard
totalMedicines: 'کل ادویات',
totalSales: 'کل فروخت',
totalCustomers: 'کل گاہک',
lowStock: 'کم اسٹاک',
today: 'آج',
thisWeek: 'اس ہفتے',
thisMonth: 'اس مہینے',
thisYear: 'اس سال',
custom: 'اپنی تاریخ منتخب کریں',
export: 'ایکسپورٹ',
exportPDF: 'پی ڈی ایف ایکسپورٹ',
exportExcel: 'ایکسِل ایکسپورٹ',
lowStockAlert: 'کم اسٹاک کی اطلاع',
checkStock: 'اسٹاک چیک کریں',
recentActivity: 'حالیہ سرگرمیاں',
salesOverview: 'فروخت کا جائزہ',
medicineOverview: 'ادویات کا جائزہ',
noRecentActivity: 'کوئی حالیہ سرگرمی نہیں',
welcomeBack: 'واپس خوش آمدید',
todayRevenue: 'آج کی آمدنی',
todayTotalSales: 'آج کی کل فروخت',
medicinesInventory: 'اسٹاک میں موجود ادویات',
registeredCustomers: 'رجسٹرڈ گاہک',
totalSuppliers: 'کل سپلائرز',
registeredSuppliers: 'رجسٹرڈ سپلائرز',
averageSale: 'اوسط فروخت',
perTransaction: 'فی لین دین',
totalTransactions: 'آج کے لین دین',
itemsSold: 'فروخت شدہ اشیاء',
totalUnitsSold: 'فروخت شدہ کل یونٹس',
grossProfit: 'مجموعی منافع',
beforeExpenses: 'اخراجات سے پہلے',
lowStockMessage: '2 ادویات کا اسٹاک مقررہ حد سے کم ہے۔',
salesDescription: 'اپنی فارمیسی کی فروخت کی کارکردگی کا جائزہ لیں',
last7Days: 'گزشتہ 7 دن',
last30Days: 'گزشتہ 30 دن',
mon: 'پیر',
tue: 'منگل',
wed: 'بدھ',
thu: 'جمعرات',
fri: 'جمعہ',
sat: 'ہفتہ',
sun: 'اتوار',
week1: 'ہفتہ 1',
week2: 'ہفتہ 2',
week3: 'ہفتہ 3',
week4: 'ہفتہ 4',
categorySales: 'کیٹیگری کے لحاظ سے فروخت',
salesByCategory: 'ادویات کی کیٹیگری کے لحاظ سے فروخت',
tablets: 'گولیاں',
syrups: 'شربت',
injections: 'انجیکشن',
otherMedicines: 'دیگر ادویات',
recentActivityDescription: 'آپ کی فارمیسی کی تازہ ترین سرگرمیاں',
newSaleCompleted: 'نئی فروخت مکمل ہوئی',
saleCompletedMessage: 'ادویات کی فروخت کا عمل کامیابی سے مکمل ہوا۔',
stockUpdated: 'اسٹاک اپڈیٹ ہوا',
stockUpdatedMessage: 'ادویات کے اسٹاک کی معلومات اپڈیٹ کر دی گئی ہیں۔',
newCustomerRegistered: 'نیا گاہک رجسٹر ہوا',
customerRegisteredMessage: 'سسٹم میں ایک نیا گاہک شامل کیا گیا۔',
posTitle: 'فارمیسی سیلز',
posDescription: 'دوائیں تلاش کریں اور آرڈر میں شامل کریں',
searchMedicines: 'دوائیں تلاش کریں...',
allMedicines: 'تمام دوائیں',
tablets: 'گولیاں',
syrups: 'شربت',
injections: 'انجیکشن',
other: 'دیگر',
currentOrder: 'موجودہ آرڈر',
noMedicines: 'ابھی کوئی دوا شامل نہیں کی گئی',
addToCart: 'کارٹ میں شامل کریں',
posHeading: 'فروخت / پی او ایس',
productCategory: 'مصنوعات کی اقسام',
totalProducts: 'کل مصنوعات',
inventoryValue: 'اسٹاک کی مالیت',
sold: 'فروخت شدہ',
alert: 'الرٹ',
addProduct: 'پروڈکٹ شامل کریں',
inventory: 'انوینٹری',
medicineName: 'دوا کا نام',
category: 'قسم',
price: 'قیمت',
stock: 'اسٹاک',
saveProduct: 'پروڈکٹ محفوظ کریں',
subtotal: 'ذیلی کل',
total: 'کل رقم',
checkout: 'چیک آؤٹ',
pleaseAddMedicines: 'براہ کرم پہلے کارٹ میں ادویات شامل کریں!',
saleCompleted: 'فروخت کامیابی سے مکمل ہو گئی!',
addMedicine: 'دوا شامل کریں',
medicineId: 'دوا کا شناختی نمبر',
manufacturer: 'کمپنی کا نام',
purchasePrice: 'خریداری کی قیمت',
sellingPrice: 'فروخت کی قیمت',
quantity: 'مقدار',
expiryDate: 'میعاد ختم ہونے کی تاریخ',
medicineImage: 'دوا کی تصویر',
description: 'تفصیل',
saveMedicine: 'دوا محفوظ کریں',
reset: 'ری سیٹ کریں',
cancel: 'منسوخ کریں',
back: 'واپس',
selectCategory: 'قسم منتخب کریں',
medicineAdded: 'دوا کامیابی سے شامل ہو گئی!',
scanMedicine: 'دوا اسکین کریں',
closeScanner: 'اسکینر بند کریں',
barcode: 'بارکوڈ',
qrCode: 'کیو آر کوڈ',
scanning: 'اسکین کیا جا رہا ہے...',
requestCameraPermission: 'کیمرے کی اجازت طلب کریں',
medicineFound: 'دوا مل گئی',
medicineNotFound: 'دوا نہیں ملی',
scannedCode: 'اسکین کیا گیا کوڈ',
fillMedicineFields: 'براہ کرم تمام ضروری خانے پُر کریں۔',
addCategory: 'نیا کیٹیگری شامل کریں',
categoryName: 'کیٹیگری کا نام',
categoryExists: 'یہ کیٹیگری پہلے سے موجود ہے!',
totalCategories: 'کل کیٹیگریز',
categoryMedicines: 'کیٹیگری کی ادویات',
backToCategories: 'کیٹیگریز پر واپس جائیں',
noMedicinesInCategory: 'اس کیٹیگری میں کوئی دوا موجود نہیں',
supplierName: 'سپلائر کا نام',
companyName: 'کمپنی کا نام',
contactPerson: 'رابطہ کرنے والا شخص',
phoneNumber: 'فون نمبر',
emailAddress: 'ای میل ایڈریس',
fullAddress: 'مکمل پتہ',
city: 'شہر',
country: 'ملک',
taxNumber: 'ٹیکس / رجسٹریشن نمبر',
notes: 'نوٹس',
addSupplier: 'سپلائر شامل کریں',
editSupplier: 'سپلائر میں ترمیم کریں',
supplierDetails: 'سپلائر کی تفصیلات',
searchSupplier: 'سپلائر تلاش کریں...',
totalSuppliers: 'کل سپلائرز',
saveSupplier: 'سپلائر محفوظ کریں',
updateSupplier: 'سپلائر اپ ڈیٹ کریں',
deleteSupplier: 'سپلائر حذف کریں',
noSuppliersFound: 'کوئی سپلائر نہیں ملا',
adminName: 'ایڈمن کا نام',
adminEmail: 'ای میل ایڈریس',
saveChanges: 'تبدیلیاں محفوظ کریں',
back: 'واپس',
cancel: 'منسوخ کریں',
profileSaved: 'پروفائل کامیابی سے محفوظ ہو گیا!',
automaticBackup: 'خودکار بیک اپ',
automaticBackupDescription: 'اپنے ایپ ڈیٹا کو خودکار طور پر محفوظ کریں',
enableAutomaticBackup: 'خودکار بیک اپ فعال کریں',
lastBackup: 'آخری بیک اپ',
},

  Spanish: {
  dashboard: 'Panel',
  medicineManagement: 'Gestión de medicamentos',
  categories: 'Categorías',
  suppliers: 'Proveedores',
  customers: 'Clientes',
  purchases: 'Gestión de compras',
  sales: 'Ventas',
  stock: 'Gestión de inventario',
  expiry: 'Control de caducidad',
  expenses: 'Gastos',
  reports: 'Informes',
  notifications: 'Notificaciones',
  settings: 'Configuración',
  settingsDescription: 'Administra la configuración de tu sistema Pharma Care',
  adminProfile: 'Perfil de administrador',
adminProfileDescription: 'Administra los datos y el perfil de la cuenta',
manage: 'Administrar',
  pharmacyDashboard: 'Panel de farmacia',
  welcomeMessage: '¡Bienvenido! Esto es lo que sucede en tu farmacia.',
  mainMenu: 'MENÚ PRINCIPAL',
  managementSystem: 'Sistema de gestión',
  adminProfile: 'Perfil de administrador',
  administrator: 'Administrador',
  close: 'Cerrar',
  clearAll: 'Borrar todo',
noNewNotifications: 'No hay nuevas notificaciones',
myProfile: 'Mi perfil',
resetPassword: 'Restablecer contraseña',
help: 'Ayuda',
systemChecker: 'Verificador del sistema',
logout: 'Cerrar sesión',
currentPassword: 'Contraseña actual',
newPassword: 'Nueva contraseña',
confirmPassword: 'Confirmar nueva contraseña',
savePassword: 'Guardar contraseña',
fillAllFields: 'Por favor, completa todos los campos.',
passwordMismatch: 'Las contraseñas no coinciden.',
passwordLength: 'La contraseña debe tener al menos 6 caracteres.',
passwordSuccess: '¡Validación de contraseña exitosa!',
helpWelcome: 'Bienvenido al Centro de Ayuda de Pharma Care.',
helpDescription: 'Aquí puedes obtener ayuda con:',
helpMedicine: 'Gestión de medicamentos',
helpStock: 'Gestión de inventario',
helpSales: 'Ventas y compras',
helpExpiry: 'Control de caducidad',
helpReports: 'Informes',
// Dashboard
totalMedicines: 'Total de medicamentos',
totalSales: 'Ventas totales',
totalCustomers: 'Total de clientes',
lowStock: 'Stock bajo',
today: 'Hoy',
thisWeek: 'Esta semana',
thisMonth: 'Este mes',
thisYear: 'Este año',
custom: 'Personalizado',
export: 'Exportar',
exportPDF: 'Exportar PDF',
exportExcel: 'Exportar Excel',
lowStockAlert: 'Alerta de stock bajo',
checkStock: 'Revisar stock',
recentActivity: 'Actividad reciente',
salesOverview: 'Resumen de ventas',
medicineOverview: 'Resumen de medicamentos',
noRecentActivity: 'No hay actividad reciente',
welcomeBack: 'Bienvenido de nuevo',
todayRevenue: 'Ingresos de hoy',
todayTotalSales: 'Ventas totales de hoy',
medicinesInventory: 'Medicamentos en inventario',
registeredCustomers: 'Clientes registrados',
totalSuppliers: 'Total de proveedores',
registeredSuppliers: 'Proveedores registrados',
averageSale: 'Venta promedio',
perTransaction: 'Por transacción',
totalTransactions: 'Transacciones de hoy',
itemsSold: 'Artículos vendidos',
totalUnitsSold: 'Unidades totales vendidas',
grossProfit: 'Beneficio bruto',
beforeExpenses: 'Antes de gastos',
lowStockMessage: '2 medicamentos están por debajo del nivel de reposición.',
salesDescription: 'Supervisa el rendimiento de ventas de tu farmacia',
last7Days: 'Últimos 7 días',
last30Days: 'Últimos 30 días',
mon: 'Lun',
tue: 'Mar',
wed: 'Mié',
thu: 'Jue',
fri: 'Vie',
sat: 'Sáb',
sun: 'Dom',
week1: 'Semana 1',
week2: 'Semana 2',
week3: 'Semana 3',
week4: 'Semana 4',
categorySales: 'Ventas por categoría',
salesByCategory: 'Ventas por categoría de medicamentos',
tablets: 'Tabletas',
syrups: 'Jarabes',
injections: 'Inyecciones',
otherMedicines: 'Otros medicamentos',
recentActivityDescription: 'Últimas actividades en tu farmacia',
newSaleCompleted: 'Nueva venta completada',
saleCompletedMessage: 'La transacción de venta de medicamentos se completó correctamente.',
stockUpdated: 'Stock actualizado',
stockUpdatedMessage: 'La información del inventario de medicamentos se ha actualizado.',
newCustomerRegistered: 'Nuevo cliente registrado',
customerRegisteredMessage: 'Se ha añadido un nuevo cliente al sistema.',
posTitle: 'Punto de Venta de Farmacia',
posDescription: 'Busca medicamentos y añádelos al pedido',
searchMedicines: 'Buscar medicamentos...',
allMedicines: 'Todos los medicamentos',
tablets: 'Tabletas',
syrups: 'Jarabes',
injections: 'Inyecciones',
other: 'Otros',
currentOrder: 'Pedido actual',
noMedicines: 'No hay medicamentos añadidos',
addToCart: 'Añadir al carrito',
posHeading: 'Ventas / TPV',
productCategory: 'Categoría de productos',
totalProducts: 'Total de productos',
inventoryValue: 'Valor del inventario',
sold: 'Vendidos',
alert: 'Alerta',
addProduct: 'Añadir producto',
inventory: 'Inventario',
medicineName: 'Nombre del medicamento',
category: 'Categoría',
price: 'Precio',
stock: 'Existencias',
saveProduct: 'Guardar producto',
subtotal: 'Subtotal',
total: 'Total',
checkout: 'Finalizar compra',
pleaseAddMedicines: '¡Añade medicamentos al carrito primero!',
saleCompleted: '¡Venta completada correctamente!',
addMedicine: 'Añadir medicamento',
medicineId: 'ID del medicamento',
manufacturer: 'Fabricante',
purchasePrice: 'Precio de compra',
sellingPrice: 'Precio de venta',
quantity: 'Cantidad',
expiryDate: 'Fecha de caducidad',
medicineImage: 'Imagen del medicamento',
description: 'Descripción',
saveMedicine: 'Guardar medicamento',
reset: 'Restablecer',
cancel: 'Cancelar',
back: 'Volver',
selectCategory: 'Seleccionar categoría',
medicineAdded: '¡Medicamento añadido correctamente!',
scanMedicine: 'Escanear medicamento',
closeScanner: 'Cerrar escáner',
barcode: 'Código de barras',
qrCode: 'Código QR',
scanning: 'Escaneando...',
requestCameraPermission: 'Solicitar permiso de cámara',
medicineFound: 'Medicamento encontrado',
medicineNotFound: 'Medicamento no encontrado',
scannedCode: 'Código escaneado',
fillMedicineFields: 'Por favor, completa todos los campos obligatorios.',
addCategory: 'Añadir categoría',
categoryName: 'Nombre de categoría',
categoryExists: '¡Esta categoría ya existe!',
totalCategories: 'Total de categorías',
categoryMedicines: 'Medicamentos de la categoría',
backToCategories: 'Volver a categorías',
noMedicinesInCategory: 'No se encontraron medicamentos en esta categoría',
supplierName: 'Nombre del proveedor',
companyName: 'Nombre de la empresa',
contactPerson: 'Persona de contacto',
phoneNumber: 'Número de teléfono',
emailAddress: 'Correo electrónico',
fullAddress: 'Dirección completa',
city: 'Ciudad',
country: 'País',
taxNumber: 'Número fiscal / de registro',
notes: 'Notas',
addSupplier: 'Añadir proveedor',
editSupplier: 'Editar proveedor',
supplierDetails: 'Detalles del proveedor',
searchSupplier: 'Buscar proveedor...',
totalSuppliers: 'Total de proveedores',
saveSupplier: 'Guardar proveedor',
updateSupplier: 'Actualizar proveedor',
deleteSupplier: 'Eliminar proveedor',
noSuppliersFound: 'No se encontraron proveedores',
adminName: 'Nombre del administrador',
adminEmail: 'Correo electrónico',
saveChanges: 'Guardar cambios',
back: 'Volver',
cancel: 'Cancelar',
profileSaved: '¡Perfil guardado correctamente!',
automaticBackup: 'Copia de seguridad automática',
automaticBackupDescription: 'Guarda automáticamente los datos de tu aplicación',
enableAutomaticBackup: 'Activar copia de seguridad automática',
lastBackup: 'Última copia de seguridad',
}
}
const t = translations[language]
// PDF EXPORT FUNCTION
const exportDashboardPDF = () => {
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text('Pharma Care - Dashboard Report', 20, 20)

  doc.setFontSize(11)

doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 32)

doc.text(`Report Period: ${selectedPeriod}`, 20, 42)

  doc.setFontSize(14)
  doc.text('Main Statistics', 20, 58)

  doc.setFontSize(12)
  doc.text("Today's Revenue: Rs. 45,800", 20, 60)
  doc.text('Total Medicines: 1,248', 20, 70)
  doc.text('Total Customers: 320', 20, 80)
  doc.text('Total Suppliers: 18', 20, 90)

  doc.text('Additional Statistics', 20, 110)
  doc.text('Average Sale: Rs. 2,290', 20, 122)
  doc.text("Today's Sales: 20", 20, 132)
  doc.text('Items Sold: 156', 20, 142)
  doc.text('Gross Profit: Rs. 12,500', 20, 152)

  doc.text('Low Stock Alert: 2 medicines', 20, 172)

  doc.save('Pharma-Care-Dashboard-Report.pdf')
}

// EXCEL EXPORT FUNCTION
const exportDashboardExcel = () => {

  const dashboardData = [
    ['Pharma Care - Dashboard Report'],
    ['Generated:', new Date().toLocaleString()],
    ['Report Period:', selectedPeriod],
    [],
    ['Main Statistics'],
    ["Today's Revenue", "Rs. 45,800"],
    ['Total Medicines', 1248],
    ['Total Customers', 320],
    ['Total Suppliers', 18],
    [],
    ['Additional Statistics'],
    ['Average Sale', 'Rs. 2,290'],
    ["Today's Sales", 20],
    ['Items Sold', 156],
    ['Gross Profit', 'Rs. 12,500'],
    [],
    ['Low Stock Alert', '2 Medicines']
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(dashboardData)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard')

  XLSX.writeFile(workbook, 'Pharma-Care-Dashboard.xlsx')

}
const [medicines, setMedicines] = useState(() => [
  
{
  id: 1,
  name: 'Panadol',
  category: 'Tablets',
  manufacturer: 'GSK',
  purchasePrice: 40,
  price: 50,
  stock: 100,
  barcode: 'PC-0001',
  qrCode: 'MED-001',
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
},
{
  id: 2,
  name: 'Brufen',
  category: 'Tablets',
  manufacturer: 'Abbott',
  purchasePrice: 60,
  price: 80,
  stock: 75,
  barcode: 'PC-0002',
  qrCode: 'MED-002',
  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400'
},
{
  id: 3,
  name: 'Disprin',
  category: 'Tablets',
  manufacturer: 'Reckitt',
  purchasePrice: 25,
  price: 35,
  stock: 90,
  barcode: 'PC-0003',
  qrCode: 'MED-003',
  image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400'
},
{
  id: 4,
  name: 'Calpol',
  category: 'Syrups',
  manufacturer: 'GSK',
  purchasePrice: 140,
  price: 180,
  stock: 40,
  barcode: 'PC-0004',
  qrCode: 'MED-004',
  image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'
},
{
  id: 5,
  name: 'Augmentin',
  category: 'Tablets',
  manufacturer: 'GSK',
  purchasePrice: 380,
  price: 450,
  stock: 35,
  barcode: 'PC-0005',
  qrCode: 'MED-005',
  image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
},
{
  id: 6,
  name: 'Vitamin C',
  category: 'Tablets',
  manufacturer: 'Nutrifactor',
  purchasePrice: 200,
  price: 250,
  stock: 60,
  barcode: 'PC-0006',
  qrCode: 'MED-006',
  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400'
},
{
  id: 7,
  name: 'Cough Syrup',
  category: 'Syrups',
  manufacturer: 'Sami Pharmaceuticals',
  purchasePrice: 140,
  price: 180,
  stock: 40,
  barcode: 'PC-0007',
  qrCode: 'MED-007',
  image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400'
},
{
  id: 8,
  name: 'Multivitamin Syrup',
  category: 'Syrups',
  manufacturer: 'Abbott',
  purchasePrice: 260,
  price: 320,
  stock: 25,
  barcode: 'PC-0008',
  qrCode: 'MED-008',
  image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'
},
{
  id: 9,
  name: 'Cefixime',
  category: 'Tablets',
  manufacturer: 'Getz Pharma',
  purchasePrice: 220,
  price: 280,
  stock: 50,
  barcode: 'PC-0009',
  qrCode: 'MED-009',
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
},
{
  id: 10,
  name: 'Omeprazole',
  category: 'Tablets',
  manufacturer: 'Getz Pharma',
  purchasePrice: 90,
  price: 120,
  stock: 80,
  barcode: 'PC-0010',
  qrCode: 'MED-010',
  image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
},
{
  id: 11,
  name: 'Insulin',
  category: 'Injections',
  manufacturer: 'Novo Nordisk',
  purchasePrice: 550,
  price: 650,
  stock: 20,
  barcode: 'PC-0011',
  qrCode: 'MED-011',
  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400'
},
{
  id: 12,
  name: 'Vitamin B12',
  category: 'Injections',
  manufacturer: 'Martin Dow',
  purchasePrice: 170,
  price: 220,
  stock: 30,
  barcode: 'PC-0012',
  qrCode: 'MED-012',
  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400'
},
{
  id: 13,
  name: 'Azithromycin',
  category: 'Tablets',
  manufacturer: 'Pfizer',
  purchasePrice: 240,
  price: 300,
  stock: 45,
  barcode: 'PC-0013',
  qrCode: 'MED-013',
  image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
},
{
  id: 14,
  name: 'ORS',
  category: 'Other',
  manufacturer: 'Abbott',
  purchasePrice: 30,
  price: 40,
  stock: 100,
  barcode: 'PC-0014',
  qrCode: 'MED-014',
  image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'
},
{
  id: 15,
  name: 'Antiseptic Solution',
  category: 'Other',
  manufacturer: 'Reckitt',
  purchasePrice: 110,
  price: 150,
  stock: 35,
  barcode: 'PC-0015',
  qrCode: 'MED-015',
  image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400'
},
{
  id: 16,
  name: 'Eye Drops',
  category: 'Other',
  manufacturer: 'Santen',
  purchasePrice: 95,
  price: 130,
  stock: 55,
  barcode: 'PC-0016',
  qrCode: 'MED-016',
  image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'
},
{
  id: 17,
  name: 'Amoxicillin',
  category: 'Capsules',
  manufacturer: 'GSK',
  purchasePrice: 155,
  price: 200,
  stock: 40,
  barcode: 'PC-0017',
  qrCode: 'MED-017',
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
},
{
  id: 18,
  name: 'Calcium Tablets',
  category: 'Tablets',
  manufacturer: 'Sami Pharmaceuticals',
  purchasePrice: 145,
  price: 190,
  stock: 65,
  barcode: 'PC-0018',
  qrCode: 'MED-018',
  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400'
},
{
  id: 19,
  name: 'Pain Relief Gel',
  category: 'Other',
  manufacturer: 'Reckitt',
  purchasePrice: 160,
  price: 210,
  stock: 28,
  barcode: 'PC-0019',
  qrCode: 'MED-019',
  image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400'
},
{
  id: 20,
  name: 'Allergy Tablets',
  category: 'Tablets',
  manufacturer: 'Getz Pharma',
  purchasePrice: 65,
  price: 90,
  stock: 70,
  barcode: 'PC-0020',
  qrCode: 'MED-020',
  image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
},
{
  id: 21,
  name: 'Skin Cream',
  category: 'Cream',
  manufacturer: 'GSK',
  purchasePrice: 190,
  price: 250,
  stock: 30,
  barcode: 'PC-0021',
  qrCode: 'MED-021',
  image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'
}

]);
useEffect(() => {
  if (!automaticBackup) return

  const backupData = {
    medicines,
    cartItems,
    sales,
    categories,
    suppliers,
    customers
  }

  localStorage.setItem(
    'PharmaCare-Auto-Backup',
    JSON.stringify(backupData)
  )

  const backupTime = new Date().toLocaleString()
  localStorage.setItem('lastBackup', backupTime)
  setLastBackup(backupTime)

}, [
  automaticBackup,
  medicines,
  cartItems,
  sales,
  categories,
  suppliers,
  customers
])
useEffect(() => {
  if (!showScanner) return;

  const scanner = new Html5QrcodeScanner(
    'reader',
    { fps: 10, qrbox: { width: 250, height: 250 } },
    false
  );

  scanner.render(
    (decodedText) => {
      const foundMedicine = medicines.find(
        (medicine) =>
          medicine.barcode === decodedText ||
          medicine.qrCode === decodedText
      );

      setScannedMedicine(foundMedicine || { scannedCode: decodedText });
      scanner.clear().catch(() => {});
      setShowScanner(false);
    },
    () => {}
  );

  return () => {
    scanner.clear().catch(() => {});
  };
}, [showScanner, medicines]);
const [medicineForm, setMedicineForm] = useState({
  name: '',
  medicineId: '',
  category: '',
  manufacturer: '',
  purchasePrice: '',
  sellingPrice: '',
  quantity: '',
  expiryDate: '',
  barcode: '',
  qrCode: '',
  image: null,
  description: ''
})
const totalInventoryValue = medicines.reduce(
  
  (total, medicine) => total + (medicine.price * medicine.stock),
  0
)
const lowStockCount = medicines.filter(
  (medicine) => medicine.stock <= 5
).length

const filteredMedicines = medicines.filter((medicine) => {
  const matchesSearch = medicine.name
    .toLowerCase()
    .includes(searchMedicine.toLowerCase())

  const matchesCategory =
    selectedCategory === 'All' ||
    medicine.category === selectedCategory

  return matchesSearch && matchesCategory
})

const handleSaveProduct = () => {
  if (
    !newMedicineName.trim() ||
    newMedicinePrice === '' ||
    newMedicineStock === ''
  ) {
    alert('Please fill in all product fields.')
    return
  }

  const newMedicine = {
    id: Date.now(),
    name: newMedicineName.trim(),
    category: newMedicineCategory,
    price: Number(newMedicinePrice),
    stock: Number(newMedicineStock),
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
  }

  setMedicines((prev) => [...prev, newMedicine])

  setNewMedicineName('')
  setNewMedicineCategory('Tablets')
  setNewMedicinePrice('')
  setNewMedicineStock('')

  setShowAddProduct(false)
}

const handleSaveMedicine = (e) => {
  e.preventDefault()

  if (
    !medicineForm.name.trim() ||
    !medicineForm.category ||
    medicineForm.sellingPrice === '' ||
    medicineForm.quantity === ''
  ) {
    alert(t.fillMedicineFields)
    return
  }

  const medicineData = {
  id: editingMedicineId !== null ? editingMedicineId : Date.now(),
  name: medicineForm.name.trim(),
  category: medicineForm.category,
  manufacturer: medicineForm.manufacturer,
  purchasePrice: Number(medicineForm.purchasePrice),
  sellingPrice: Number(medicineForm.sellingPrice),
  price: Number(medicineForm.sellingPrice),
  quantity: Number(medicineForm.quantity),
  stock: Number(medicineForm.quantity),
  expiryDate: medicineForm.expiryDate,
barcode: medicineForm.barcode,
qrCode: medicineForm.qrCode,
description: medicineForm.description,
image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
}
  if (editingMedicineId !== null) {
    setMedicines((prev) =>
      prev.map((item) =>
        item.id === editingMedicineId ? medicineData : item
      )
    )
  } else {
    setMedicines((prev) => [...prev, medicineData])
  }
  alert(t.medicineAdded)
  setEditingMedicineId(null)
  setMedicineForm({
  name: '',
  medicineId: '',
  category: '',
  manufacturer: '',
  purchasePrice: '',
  sellingPrice: '',
  quantity: '',
  expiryDate: '',
  barcode: '',
  qrCode: '',
  image: null,
  description: ''
})
  setActivePage('Medicine Management')
}
const handleAddToCart = (medicine) => {
  setCartItems((prev) => {
    const existingMedicine = prev.find(
      (item) => String(item.id) === String(medicine.id)
    )
    if (existingMedicine) {
      return prev.map((item) =>
        String(item.id) === String(medicine.id)
          ? {
              ...item,
              quantity: Number(item.quantity) + 1
            }
          : item
      )
    }
    return [
      ...prev,
      {
        ...medicine,
        price: Number(medicine.price),
        quantity: 1
      }
    ]
  })
}

const handleQuantityChange = (id, change) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + change)
          }
        : item
    )
  )
}
const generateReceipt = (sale) => {
  const printWindow = window.open('', '_blank')

  if (!printWindow) {
    alert('Please allow pop-ups to print the receipt.')
    return
  }

  const receiptText = {
    English: {
      title: 'PHARMACY SALES RECEIPT',
      receipt: 'Receipt No',
      date: 'Date',
      medicine: 'Medicine',
      qty: 'Qty',
      amount: 'Amount',
      total: 'TOTAL',
      thanks: 'Thank You! Visit Again'
    },
    Urdu: {
      title: 'فارمیسی سیلز رسید',
      receipt: 'رسید نمبر',
      date: 'تاریخ',
      medicine: 'دوا',
      qty: 'تعداد',
      amount: 'رقم',
      total: 'کل رقم',
      thanks: 'شکریہ! دوبارہ تشریف لائیں'
    },
    Spanish: {
      title: 'RECIBO DE VENTA',
      receipt: 'Recibo No',
      date: 'Fecha',
      medicine: 'Medicamento',
      qty: 'Cant.',
      amount: 'Importe',
      total: 'TOTAL',
      thanks: '¡Gracias! Vuelva pronto'
    }
  }

  const labels = receiptText[language]

  const rows = sale.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>Rs. ${Number(item.price) * Number(item.quantity)}</td>
    </tr>
  `).join('')

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Pharma Care Receipt</title>
      <style>
        @page {
          size: 80mm auto;
          margin: 3mm;
        }

        body {
          width: 74mm;
          margin: 0 auto;
          padding: 5px;
          font-family: Arial, sans-serif;
          color: #000;
          font-size: 12px;
        }

        h2, h4, .thanks {
          text-align: center;
        }

        h2 {
          font-size: 19px;
          margin-bottom: 4px;
        }

        h4 {
          margin-top: 0;
          font-size: 11px;
        }

        .line {
          border-top: 1px dashed #000;
          margin: 9px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
        }

        th, td {
          padding: 5px 1px;
          text-align: left;
          word-break: break-word;
        }

        .total {
          text-align: right;
          font-size: 15px;
          font-weight: bold;
        }

        .thanks {
          margin-top: 20px;
          font-weight: bold;
        }
      </style>
    </head>

    <body>
      <h2>PHARMA CARE</h2>
      <h4>${labels.title}</h4>

      <div>${labels.receipt}: ${sale.id}</div>
      <div>${labels.date}: ${sale.date}</div>

      <div class="line"></div>

      <table>
        <thead>
          <tr>
            <th>${labels.medicine}</th>
            <th>${labels.qty}</th>
            <th>${labels.amount}</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="line"></div>

      <div class="total">
        ${labels.total}: Rs. ${sale.total}
      </div>

      <div class="thanks">${labels.thanks}</div>
    </body>
    </html>
  `)

  printWindow.document.close()

  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
  }
}

const handleRemoveFromCart = (id) => {
  setCartItems((prev) =>
    prev.filter((item) => item.id !== id)
  )
}

const cartSubtotal = cartItems.reduce(
  (total, item) => total + Number(item.price) * item.quantity,
  0
)
  const handleCheckout = () => {
  if (cartItems.length === 0) {
    alert(t.pleaseAddMedicines)
    return
  }

  const newSale = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: [...cartItems],
    total: cartSubtotal
  }

  generateReceipt(newSale)

  setSales(prevSales => [...prevSales, newSale])

  setCartItems([])
}
const confirmDeleteSupplier = () => {
  setSuppliers(
    suppliers.filter(
      (supplier) => supplier.id !== deleteSupplierId
    )
  )
  if (viewSupplier?.id === deleteSupplierId) {
    setViewSupplier(null)
  }
  setDeleteSupplierId(null)
}
  return (
    <div className="app-shell">
      {showScanner && (
  <div className="scanner-overlay">
    <div className="scanner-box">
      <h2>{t.scanMedicine}</h2>
      <div id="reader"></div>

      <button
        type="button"
        onClick={() => setShowScanner(false)}
      >
        {t.closeScanner}
      </button>
    </div>
  </div>
)}
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">💊</div>
          <div>
            <h2>Pharma Care</h2>
            <span>{t.managementSystem}</span>
          </div>
        </div>
        <p className="nav-title">{t.mainMenu}</p>
        <nav className="sidebar-nav">
  <a
  href="#"
  className={activePage === 'Dashboard' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Dashboard')
  }}
>
  <span>▦</span> {t.dashboard}
</a>
  <a
  href="#"
  className={activePage === 'Medicine Management' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Medicine Management')
  }}
>
  <span>💊</span> {t.medicineManagement}
</a>
  <a
  href="#"
  className={activePage === 'Categories' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Categories')
  }}
>
  <span>▤</span> {t.categories}
</a>
  <a
  href="#"
  className={activePage === 'Suppliers' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Suppliers')
  }}
>
  <span>♙</span> {t.suppliers}
</a>
  <a
  href="#"
  className={activePage === 'Customers' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Customers')
  }}
>
  <span>♧</span> {t.customers}
</a>
  <a href="#"><span>🛒</span> {t.purchases}</a>
  <a
  href="#"
  className={activePage === 'Sales' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Sales')
  }}
>
  <span>💰</span> {t.sales} / POS
</a>
  <a
  href="#"
  className={activePage === 'Stock Management' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Stock Management')
  }}
>
  <span>▣</span> {t.stock}
</a>
  <a
    href="#"
    className={activePage === 'Inventory' ? 'active' : ''}
    onClick={(e) => {
      e.preventDefault()
      setActivePage('Inventory')
    }}
  >
    <span>🏬</span> {t.inventory}
  </a>
  <a href="#"><span>⌛</span> {t.expiry}</a>
  <a href="#"><span>▧</span> {t.expenses}</a>
  <a
  href="#"
  className={activePage === 'Reports' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Reports')
  }}
>
  <span>▥</span> {t.reports}
</a>
  <a href="#"><span>🔔</span> {t.notifications}</a>
  <a
  href="#"
  className={activePage === 'Settings' ? 'active' : ''}
  onClick={(e) => {
    e.preventDefault()
    setActivePage('Settings')
  }}
>
  <span>⚙</span> {t.settings}
</a>
</nav>

        <div className="sidebar-footer">
          <span>Pharma Care</span>
          <small>Version 1.0.0</small>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
      {/* TOPBAR */}
<header className="topbar">

  <div className="topbar-left">

    <button className="menu-btn" aria-label="Open sidebar">
      ☰
    </button>

    <div className="header-brand">
  <div className="header-brand-icon">💊</div>
  <div>
    <strong>Pharma Care</strong>
    <small>
      {activePage === 'Dashboard'
        ? t.dashboard
        : activePage === 'Sales'
? t.posHeading
: activePage === 'Inventory'
? t.inventory
: activePage === 'Reports'
? t.reports
: activePage === 'Medicine Management' || activePage === 'Add Medicine'
? t.medicineManagement
: activePage === 'Customers'
? t.customers
: activePage === 'Suppliers'
? t.suppliers
: activePage === 'Categories'
? t.categories
: activePage === 'Stock Management'
? t.stock
: activePage === 'Add Supplier'
? t.addSupplier
: activePage === 'Settings'
? t.settings
: t.stock}
    </small>
  </div>
</div>

{activePage === 'Sales' && (
  <div className="header-medicine-search">
    <input
  type="text"
  placeholder={t.searchMedicines}
  value={searchMedicine}
  onChange={(e) => setSearchMedicine(e.target.value)}
/>
  </div>
)}

  </div>

  <div className="header-right">

    <div className="header-date">
  <strong>
    {currentDateTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })}
  </strong>

  <span>•</span>

  <strong>
    {currentDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}
  </strong>
</div>

    <button
  className="language-btn"
  onClick={() => setShowLanguages(!showLanguages)}
>
  🌐 {language === 'English' ? 'EN' : language === 'Urdu' ? 'UR' : 'ES'}
</button>

{showLanguages && (
  <div className="language-dropdown">

    <button onClick={() => {
      setLanguage('English')
      setShowLanguages(false)
    }}>
      English
    </button>

    <button onClick={() => {
      setLanguage('Urdu')
      setShowLanguages(false)
    }}>
      اردو
    </button>

    <button onClick={() => {
      setLanguage('Spanish')
      setShowLanguages(false)
    }}>
      Spanish 
    </button>

  </div>
)}

    <div className={`online-status ${isOnline ? 'is-online' : 'is-offline'}`}>
  <span></span>
  {isOnline ? 'Online' : 'Offline'}
</div>

    <button
  className="notification-btn"
  onClick={() => setShowNotifications(!showNotifications)}
>
  🔔

  {notifications.length > 0 && (
    <span className="notification-count">
      {notifications.length}
    </span>
  )}
</button>

{showNotifications && (
  <div className="notification-dropdown">
    <div className="notification-header">
  <h3>Notifications</h3>

  {notifications.length > 0 && (
    <button
      className="clear-notifications"
      onClick={() => setNotifications([])}
    >
      {t.clearAll}
    </button>
  )}
</div>

    {notifications.length > 0 ? (
      notifications.map((item) => (
        <div className="notification-item" key={item.id}>
          🔔 {item.message[language]}
        </div>
      ))
    ) : (
      <p>{t.noNewNotifications}</p>
    )}
  </div>
)}
    <button
  className="profile"
  onClick={() => setShowProfile(!showProfile)}
>
  <div className="profile-avatar">A</div>
  <div>
    <strong>{t.adminProfile}</strong>
<small>{t.administrator}</small>
  </div>
  <span>⌄</span>
</button>
{showProfile && (
  <div className="profile-dropdown">

    <button onClick={() => {
  setShowProfile(false)
  setShowMyProfile(true)
}}>
  👤 {t.myProfile}
</button>

    <button onClick={() => {
  setShowProfile(false)
  setShowResetPassword(true)
}}>
  🔑 {t.resetPassword}
</button>

    <button onClick={() => {
  setShowProfile(false)
  setShowHelp(true)
}}>
  ❓ {t.help}
</button>
    <button onClick={() => {
  setShowProfile(false)
  setShowSystemChecker(true)
}}>
  🛠️ {t.systemChecker}
</button>

    <div className="profile-divider"></div>

    <button
  className="logout-btn"
  onClick={() => {
    setShowProfile(false)
    setShowLogoutConfirm(true)
  }}
>
  🚪 {t.logout}
</button>

  </div>
)}
{showMyProfile && (
  <div className="profile-modal-overlay">
    <div className="profile-modal">

      <h2>{t.myProfile}</h2>

      <div className="profile-avatar">A</div>

      <h3>Admin</h3>
      <p>Administrator</p>

      <button onClick={() => setShowMyProfile(false)}>
        {t.close}
      </button>

    </div>
  </div>
)}
{showResetPassword && (
  <div className="profile-modal-overlay">
    <div className="profile-modal">

      <h2>{t.resetPassword}</h2>

      <input
  type="password"
  id="currentPassword"
  placeholder={t.currentPassword}
/>

<input
  type="password"
  id="newPassword"
  placeholder={t.newPassword}
/>

<input
  type="password"
  id="confirmPassword"
 placeholder={t.confirmPassword}
/>

      <div className="password-actions">
        <button onClick={() => setShowResetPassword(false)}>
          {t.close}
        </button>

        <button
  className="save-password-btn"
  onClick={() => {
    const currentPassword = document.getElementById('currentPassword').value
    const newPassword = document.getElementById('newPassword').value
    const confirmPassword = document.getElementById('confirmPassword').value

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert(t.fillAllFields)
      return
    }

    if (newPassword !== confirmPassword) {
      alert(t.passwordMismatch)
      return
    }

    if (newPassword.length < 6) {
      alert(t.passwordLength)
      return
    }

    alert(t.passwordSuccess)

    setShowResetPassword(false)
  }}
>
  {t.savePassword}
</button>
      </div>

    </div>
  </div>
)}
{showHelp && (
  <div className="profile-modal-overlay">
    <div className="profile-modal">

      <h2>{t.help}</h2>

      <p>{t.helpWelcome}</p>

<p>{t.helpDescription}</p>

<ul style={{ textAlign: 'left' }}>
  <li>{t.helpMedicine}</li>
  <li>{t.helpStock}</li>
  <li>{t.helpSales}</li>
  <li>{t.helpExpiry}</li>
  <li>{t.helpReports}</li>
</ul>

      <button onClick={() => setShowHelp(false)}>
        {t.close}
      </button>

    </div>
  </div>
)}
{showSystemChecker && (
  <div className="profile-modal-overlay">
    <div className="profile-modal">

      <h2>{t.systemChecker}</h2>

      <div style={{ textAlign: 'left', marginTop: '20px' }}>
        <p>🟢 Application: Running</p>
        <p>🟢 Browser: {navigator.userAgent.split(' ').slice(-1)[0]}</p>
        <p>
          {isOnline
            ? '🟢 Internet: Online'
            : '🔴 Internet: Offline'}
        </p>
        <p>🟢 React Application: Active</p>
      </div>

      <button onClick={() => setShowSystemChecker(false)}>
        {t.close}
      </button>

    </div>
  </div>
)}
{showLogoutConfirm && (
  <div className="profile-modal-overlay">
    <div className="profile-modal">

      <h2>{t.logout}</h2>

      <p>Are you sure you want to logout?</p>

      <div className="password-actions">

        <button onClick={() => setShowLogoutConfirm(false)}>
          Cancel
        </button>

        <button
          className="save-password-btn"
          onClick={() => {
            setShowLogoutConfirm(false)
            alert('Logout functionality will be connected with login system later.')
          }}
        >
          Confirm
        </button>

      </div>

    </div>
  </div>
)}

</div>
</header>
{(activePage === 'Settings' || activePage === 'Admin Profile') && (
  <div className="settings-page">
    <div className="settings-header">

      {activePage === 'Settings' && (
        <>
          <h1>⚙️ {t.settings}</h1>
          <p>{t.settingsDescription}</p>
        </>
      )}

      {activePage === 'Settings' && (
        <div className="settings-grid">
          <div className="settings-card">
            <div className="settings-icon">👤</div>
            <h3>{t.adminProfile}</h3>
            <p>{t.adminProfileDescription}</p>
            <button
              type="button"
              onClick={() => setActivePage('Admin Profile')}
            >
              {t.manage}
            </button>
          </div>
           {/* MANUAL BACKUP CARD */}
<div className="settings-card">
  <div className="settings-icon">💾</div>

  <h3>{t.manualBackup}</h3>

  <p>{t.manualBackupDescription}</p>

  <p>
    {t.lastBackup}: {lastBackup || '—'}
  </p>

  <button type="button" onClick={handleManualBackup}>
    {t.backupNow}
  </button>
</div>
    {/* AUTOMATIC BACKUP CARD */}
<div className="settings-card">
  <div className="settings-icon">🔄</div>

  <h3>{t.automaticBackup}</h3>
  <p>{t.automaticBackupDescription}</p>

  <label>
    <input
      type="checkbox"
      checked={automaticBackup}
      onChange={(e) => handleAutomaticBackup(e.target.checked)}
    />
    {t.enableAutomaticBackup}
  </label>

  <p>
    {t.lastBackup}: {lastBackup || '—'}
  </p>
</div>

        </div>
      )}

      {activePage === 'Admin Profile' && (
      <div className="settings-card admin-profile-form">

        <button
          type="button"
          onClick={() => setActivePage('Settings')}
        >
          ← {t.back}
        </button>

        <h2>{t.adminProfile}</h2>

        <div className="admin-image-section">
          <div className="admin-image-preview">
            {adminImage ? (
              <img src={adminImage} alt="Admin Profile" />
            ) : (
              <span>👤</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0]

              if (file) {
                const reader = new FileReader()

                reader.onloadend = () => {
                  setAdminImage(reader.result)
                }

                reader.readAsDataURL(file)
              }
            }}
          />
        </div>

        <div className="admin-form-group">
          <label>{t.adminName}</label>
          <input
            type="text"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label>{t.adminEmail}</label>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
        </div>

        <div className="admin-form-buttons">
          <button
            type="button"
            onClick={() => {
              setSavedAdminName(adminName)
              setSavedAdminEmail(adminEmail)
              setSavedAdminImage(adminImage)
              alert(t.profileSaved)
              setActivePage('Settings')
            }}
          >
            {t.saveChanges}
          </button>

          <button
            type="button"
            onClick={() => {
              setAdminName(savedAdminName)
              setAdminEmail(savedAdminEmail)
              setAdminImage(savedAdminImage)
              setActivePage('Settings')
            }}
          >
            {t.cancel}
          </button>
        </div>

      </div>
        )}
      </div>
  </div>
)}
{/* DASHBOARD CONTENT */}

{activePage === 'Dashboard' ? (
  <div className="dashboard-container">

  {/* DASHBOARD HEADING */}
  <section className="dashboard-heading">

    <div>
      <h1>{t.welcomeBack}, Admin! 👋</h1>
      <p>{t.welcomeMessage}</p>
    </div>

    <div className="dashboard-heading-actions">

      <div className="date-filter">

  <button
    className={selectedPeriod === 'Today' ? 'selected' : ''}
    onClick={() => setSelectedPeriod('Today')}
  >
    {t.today}
  </button>

  <button
    className={selectedPeriod === '7D' ? 'selected' : ''}
    onClick={() => setSelectedPeriod('7D')}
  >
    7D
  </button>

  <button
    className={selectedPeriod === '30D' ? 'selected' : ''}
    onClick={() => setSelectedPeriod('30D')}
  >
    30D
  </button>

</div>

      <div className="export-dropdown">

  <button
    className="export-btn"
    onClick={() => setShowExportOptions(!showExportOptions)}
  >
    ↓ {t.export}
  </button>

  {showExportOptions && (
    <div className="export-options">

      <button onClick={() => {
        exportDashboardPDF()
        setShowExportOptions(false)
      }}>
        <i className="fa-solid fa-file-pdf"></i>
        {t.exportPDF}
      </button>

      <button onClick={() => {
        exportDashboardExcel()
        setShowExportOptions(false)
      }}>
        <i className="fa-solid fa-file-excel"></i>
        {t.exportExcel}
      </button>

    </div>
  )}

</div>

    </div>

  </section>

  {/* MAIN STATISTICS */}
  <section className="main-stats-grid">

    <div className="main-stat-card revenue-card">
      <div className="stat-card-decoration"></div>
      <div className="main-stat-icon">💰</div>
      <p>{t.todayRevenue}</p>
      <h2>Rs. 45,800</h2>
      <small>{t.todayTotalSales}</small>
    </div>

    <div className="main-stat-card medicine-card">
      <div className="stat-card-decoration"></div>
      <div className="main-stat-icon">💊</div>
      <p>{t.totalMedicines}</p>
      <h2>1,248</h2>
      <small>{t.medicinesInventory}</small>
    </div>

    <div className="main-stat-card customer-card">
      <div className="stat-card-decoration"></div>
      <div className="main-stat-icon">👥</div>
      <p>{t.totalCustomers}</p>
      <h2>320</h2>
      <small>{t.registeredCustomers}</small>
    </div>

    <div className="main-stat-card supplier-card">
      <div className="stat-card-decoration"></div>
      <div className="main-stat-icon">🏢</div>
      <p>{t.totalSuppliers}</p>
      <h2>18</h2>
      <small>{t.registeredSuppliers}</small>
    </div>

  </section>

  {/* SECONDARY STATISTICS */}
  <section className="secondary-stats-grid">

    <div className="secondary-stat-card">
      <div>
        <p>{t.averageSale}</p>
        <h2>Rs. 2,290</h2>
        <small>{t.perTransaction}</small>
      </div>
      <span>🛒</span>
    </div>

    <div className="secondary-stat-card">
      <div>
        <p>{t.totalSales}</p>
        <h2>20</h2>
        <small>{t.totalTransactions}</small>
      </div>
      <span>📊</span>
    </div>

    <div className="secondary-stat-card">
      <div>
        <p>{t.itemsSold}</p>
        <h2>156</h2>
        <small>{t.totalUnitsSold}</small>
      </div>
      <span>📦</span>
    </div>

    <div className="secondary-stat-card">
      <div>
        <p>{t.grossProfit}</p>
        <h2>Rs. 12,500</h2>
        <small>{t.beforeExpenses}</small>
      </div>
      <span>📈</span>
    </div>

  </section>
  {/* LOW STOCK ALERT */}
  <section className="low-stock-alert">

    <div className="alert-left">
      <div className="alert-icon">⚠️</div>

      <div>
        <h3>{t.lowStockAlert}</h3>
        <p>{t.lowStockMessage}</p>
      </div>
    </div>
    <button
  onClick={() => setActivePage('Stock Management')}
>
  {t.checkStock} →
</button>
  </section>
  {/* CHARTS SECTION */}
  <section className="dashboard-charts-grid">
    {/* SALES OVERVIEW */}
    <div className="dashboard-panel sales-panel">
      <div className="panel-heading">
        <div>
          <h3>📊 {t.salesOverview}</h3>
          <p>{t.salesDescription}</p>
        </div>

        <span className="panel-period">
  {selectedPeriod === 'Today'
    ? t.today
    : selectedPeriod === '7D'
    ? t.last7Days
    : t.last30Days}
</span>
      </div>

      <div className="sales-chart">

        <div className="chart-y-axis">
          <span>8k</span>
          <span>6k</span>
          <span>4k</span>
          <span>2k</span>
          <span>0</span>
        </div>

        <div className="chart-content">

          <div className="chart-grid-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="chart-bars">

            
{(selectedPeriod === 'Today'
  ? [
      { day: '9 AM', height: '35%' },
      { day: '11 AM', height: '60%' },
      { day: '1 PM', height: '45%' },
      { day: '3 PM', height: '80%' },
      { day: '5 PM', height: '95%' },
      { day: '7 PM', height: '70%' },
      { day: '9 PM', height: '55%' }
    ]
  : selectedPeriod === '7D'
  ? [
      { day: t.mon, height: '45%' },
      { day: t.tue, height: '65%' },
      { day: t.wed, height: '35%' },
      { day: t.thu, height: '80%' },
      { day: t.fri, height: '55%' },
      { day: t.sat, height: '95%' },
      { day: t.sun, height: '70%' }
    ]
  : [
      { day: t.week1, height: '50%' },
      { day: t.week2, height: '75%' },
      { day: t.week3, height: '40%' },
      { day: t.week4, height: '90%' }
    ]
).map((item) => (

              <div className="chart-bar-group" key={item.day}>
                <div className="chart-bar-area">
                  <div
                    className="chart-bar"
                    style={{ height: item.height }}
                  ></div>
                </div>

                <span>{item.day}</span>
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

    {/* CATEGORY SALES */}
    <div className="dashboard-panel category-panel">

      <div className="panel-heading">
        <div>
          <h3>📦 {t.categorySales}</h3>
<p>{t.salesByCategory}</p>
        </div>
      </div>

      <div className="category-list">

        <div className="category-item">
          <div className="category-info">
            <span>{t.tablets}</span>
            <strong>45%</strong>
          </div>
          <div className="category-progress">
            <span style={{ width: '45%' }}></span>
          </div>
        </div>

        <div className="category-item">
          <div className="category-info">
            <span>{t.syrups}</span>
            <strong>25%</strong>
          </div>
          <div className="category-progress">
            <span style={{ width: '25%' }}></span>
          </div>
        </div>

        <div className="category-item">
          <div className="category-info">
            <span>{t.injections}</span>
            <strong>18%</strong>
          </div>
          <div className="category-progress">
            <span style={{ width: '18%' }}></span>
          </div>
        </div>

        <div className="category-item">
          <div className="category-info">
            <span>{t.otherMedicines}</span>
            <strong>12%</strong>
          </div>
          <div className="category-progress">
            <span style={{ width: '12%' }}></span>
          </div>
        </div>

      </div>

    </div>

  </section>

  {/* RECENT ACTIVITY */}
  <section className="dashboard-panel recent-activity-panel">

    <div className="panel-heading">
      <div>
        <h3>🕒 {t.recentActivity}</h3>
<p>{t.recentActivityDescription}</p>
      </div>
    </div>

    <div className="activity-list">

      <div className="activity-item">
        <span className="activity-dot sale-dot"></span>
        <div>
          <strong>{t.newSaleCompleted}</strong>
<p>{t.saleCompletedMessage}</p>
        </div>
        <small>Today</small>
      </div>

      <div className="activity-item">
        <span className="activity-dot stock-dot"></span>
        <div>
          <strong>{t.stockUpdated}</strong>
<p>{t.stockUpdatedMessage}</p>
        </div>
        <small>{t.today}</small>
      </div>

      <div className="activity-item">
        <span className="activity-dot customer-dot"></span>
        <div>
          <strong>{t.newCustomerRegistered}</strong>
<p>{t.customerRegisteredMessage}</p>
        </div>
        <small>{t.today}</small>
      </div>

    </div>

  </section>

</div>
) : activePage === 'Sales' ? (
  
<div className="pos-container">

  {/* POS MAIN AREA */}
  <div className="pos-layout">

    {/* LEFT SIDE - MEDICINES */}
    <div className="pos-products">
      <div className="pos-top-toolbar">

  <div className="pos-toolbar-left">
    <h3>{t.productCategory}</h3>
    <div className="pos-category-icon">
      <i className="fas fa-th-large"></i>
    </div>
  </div>

  <div className="pos-toolbar-stats">
    <div className="pos-stat">
      <i className="fas fa-box"></i>
      <span>{t.totalProducts}</span>
      <strong>{medicines.length}</strong>
    </div>

    <div className="pos-stat">
      <i className="fas fa-warehouse"></i>
      <span>{t.inventoryValue}</span>
      <strong>{totalInventoryValue.toLocaleString()}</strong>
    </div>

    <div className="pos-stat">
      <i className="fas fa-shopping-cart"></i>
      <span>{t.sold}</span>
      <strong>0</strong>
    </div>

    <div className="pos-stat">
      <i className="fas fa-bell"></i>
      <span>{t.alert}</span>
      <strong>{lowStockCount}</strong>
    </div>
  </div>

  <div className="pos-toolbar-actions">

  <div className="clock-action">
  <span className="clock-status">
    {isClockedIn ? 'Clock Out' : 'Clock In'}
  </span>

  <button
    title={isClockedIn ? 'Clock Out' : 'Clock In'}
    onClick={() => {
      if (!isClockedIn) {
        setClockInTime(new Date())
        setIsClockedIn(true)
      } else {
        setIsClockedIn(false)
        setClockInTime(null)
      }
    }}
  >
    <i className="fas fa-clock"></i>
  </button>
</div>

  <button
  title={t.addProduct}
  onClick={() => setShowAddProduct(true)}
>
  <i className="fas fa-plus"></i>
</button>

  <button
  title={t.inventory}
  onClick={() => setActivePage('Inventory')}
>
  <i className="fas fa-warehouse"></i>
</button>

 <button
  title={t.reports}
  onClick={() => setActivePage('Reports')}
>
  <i className="fas fa-chart-bar"></i>
</button>

</div>

</div>

{showAddProduct && (
  <div className="add-product-overlay">
    <div className="add-product-modal">
      <h2>{t.addProduct}</h2>
      <div className="add-product-form">

  <label>{t.medicineName}</label>
  <input
  type="text"
  placeholder={t.medicineName}
  value={newMedicineName}
  onChange={(e) => setNewMedicineName(e.target.value)}
/>
<label>
  {language === 'Urdu'
    ? 'بارکوڈ'
    : language === 'Spanish'
    ? 'Código de barras'
    : 'Barcode'}
</label>

<input
  type="text"
  placeholder="Enter Barcode"
  value={medicineForm.barcode}
  onChange={(e) =>
    setMedicineForm({
      ...medicineForm,
      barcode: e.target.value
    })
  }
/>
<label>
  {language === 'Urdu'
    ? 'کیو آر کوڈ'
    : language === 'Spanish'
    ? 'Código QR'
    : 'QR Code'}
</label>
<input
  type="text"
  placeholder="Enter QR Code"
  value={medicineForm.qrCode}
  onChange={(e) =>
    setMedicineForm({
      ...medicineForm,
      qrCode: e.target.value
    })
  }
/>
<label>{t.category}</label>
<select
  value={newMedicineCategory}
  onChange={(e) => setNewMedicineCategory(e.target.value)}
>
  <option value="" disabled>
    {t.selectCategory}
  </option>
  {categories.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ))}
</select>
  <label>{t.price}</label>
  <input
  type="number"
  placeholder={t.price}
  value={newMedicinePrice}
  onChange={(e) => setNewMedicinePrice(e.target.value)}
/>
  <label>{t.stock}</label>
  <input
  type="number"
  placeholder={t.stock}
  value={newMedicineStock}
  onChange={(e) => setNewMedicineStock(e.target.value)}
/>
</div>
<div className="add-product-actions">
  <button
    type="button"
    className="save-product-btn"
    onClick={handleSaveProduct}
  >
    {t.saveProduct}
  </button>
  <button
    type="button"
    className="close-product-btn"
    onClick={() => setShowAddProduct(false)}
  >
    <i className="fas fa-times"></i>
  </button>
</div>
    </div>
  </div>
)}
      <div className="pos-categories">
  <button
    className={selectedCategory === 'All' ? 'active' : ''}
    onClick={() => setSelectedCategory('All')}
  >
    {t.allMedicines}
  </button>
  {categories.map((category) => (
    <button
      key={category.id}
      className={
        selectedCategory === category.name ? 'active' : ''
      }
      onClick={() => setSelectedCategory(category.name)}
    >
      {category.name}
    </button>
  ))}
</div>
<div className="medicine-products-grid">
  {filteredMedicines.map((medicine) => (
    <div className="medicine-product-card" key={medicine.id}>
      <div className="medicine-image-box">
        <img
          src={medicine.image}
          alt={medicine.name}
        />
        <button
  className="add-to-cart-btn"
  title={t.addToCart}
  onClick={() => handleAddToCart(medicine)}
>
  <i className="fas fa-cart-plus"></i>
</button>
      </div>
      <div className="medicine-product-info">
        <h3>{medicine.name}</h3>
        <span>{medicine.category}</span>
        <h4>Rs. {medicine.price}</h4>
        <p>Stock: {medicine.stock}</p>
      </div>
    </div>
  ))}
</div>
    </div>
    {/* RIGHT SIDE - CART */}
    <div className="pos-cart">
  <h2>
    <i className="fas fa-shopping-cart"></i>
    {' '}{t.currentOrder}
  </h2>
  {cartItems.length === 0 ? (
    <div className="empty-cart">
      <i className="fas fa-shopping-cart"></i>
      <p>{t.noMedicines}</p>
    </div>
  ) : (
    <div className="cart-items">
      {cartItems.map((item) => (
  <div className="cart-item" key={item.id}>
    <img src={item.image} alt={item.name} />
    <div className="cart-item-info">
      <h4>{item.name}</h4>
      <p>Rs. {item.price}</p>
      <div className="cart-quantity">
        <div className="quantity-controls">
          <button
            type="button"
            onClick={() => handleQuantityChange(item.id, -1)}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={() => handleQuantityChange(item.id, 1)}
          >
            +
          </button>
        </div>
        <span className="cart-line-total">
          Total: Rs. {(item.price * item.quantity).toLocaleString()}
        </span>
<button
  type="button"
  className="remove-cart-btn"
  title="Remove"
  onClick={() => handleRemoveFromCart(item.id)}
>
  <i className="fas fa-trash"></i>
</button>
      </div>
    </div>
    <strong>
      Rs. {(item.price * item.quantity).toLocaleString()}
    </strong>
  </div>
))}
    </div>
  )}
<div className="cart-summary">
  <div className="summary-row">
    <span>{t.subtotal}</span>
    <strong>Rs. {cartSubtotal.toLocaleString()}</strong>
  </div>
  <div className="summary-row">
    <span>{t.total}</span>
    <strong>Rs. {cartSubtotal.toLocaleString()}</strong>
  </div>
  <button
    type="button"
    className="checkout-btn"
    onClick={handleCheckout}
  >
    {t.checkout}
  </button>
</div>
</div>
</div>
</div>
) : activePage === 'Categories' ? (
  <div className="page-content category-details-page">
    <div className="category-page-header">
      <h2>{t.categories}</h2>
      <div className="category-search-box">
        <input
          type="text"
          placeholder={t.searchCategory}
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
        />
        <span>⌕</span>
      </div>
      <div className="category-stats">
        <span className="category-stats-label">
          {t.totalCategories}
        </span>
        <span className="category-stats-number">
          {categories.length}
        </span>
      </div>
      <button
        className="category-add-btn"
        onClick={() => {
          const categoryName = window.prompt(t.categoryName)
          if (!categoryName || !categoryName.trim()) return
          const exists = categories.some(
            (item) =>
              item.name.toLowerCase() ===
              categoryName.trim().toLowerCase()
          )
          if (exists) {
            alert(t.categoryExists)
            return
          }
          setCategories([
            ...categories,
            {
              id: Date.now(),
              name: categoryName.trim()
            }
          ])
        }}
      >
        + {t.addCategory}
      </button>
    </div>
    <div className="medicine-table-container">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t.categoryName}</th>
            <th>{t.actions}</th>
          </tr>
        </thead>
        <tbody>
{categories
  .filter((category) =>
    category.name
      .toLowerCase()
      .includes(categorySearch.toLowerCase())
  )
  .map((category, index) => (
    <tr key={category.id}>
      <td>{index + 1}</td>
      <td>
  <button
    className="category-name-btn"
    onClick={() => {
      setSelectedCategory(category.name)
      setActivePage('Category Details')
    }}
  >
    {category.name}
  </button>
</td>
      <td>
        <button
          onClick={() => {
            const newName = window.prompt(
              t.categoryName,
              category.name
            )
            if (!newName || !newName.trim()) return
            const exists = categories.some(
              (item) =>
                item.id !== category.id &&
                item.name.toLowerCase() ===
                  newName.trim().toLowerCase()
            )
            if (exists) {
              alert(t.categoryExists)
              return
            }
            setCategories(
              categories.map((item) =>
                item.id === category.id
                  ? { ...item, name: newName.trim() }
                  : item
              )
            )
          }}
        >
          {t.edit}
        </button>
        <button
          onClick={() =>
            setCategories(
              categories.filter(
                (item) => item.id !== category.id
              )
            )
          }
        >
          {t.delete}
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
</div>
) : activePage === 'Suppliers' ? (
  <div className="page-content supplier-form-page">
    {/* SUPPLIER PAGE HEADER */}
    <div className="category-page-header">
      <h2>{t.suppliers}</h2>
      <div className="category-search-box">
        <input
          type="text"
          placeholder={t.searchSupplier}
          value={supplierSearch}
          onChange={(e) => setSupplierSearch(e.target.value)}
        />
        <span>⌕</span>
      </div>
      <div className="category-stats">
        <span className="category-stats-label">
          {t.totalSuppliers}
        </span>
        <span className="category-stats-number">
          {suppliers.length}
        </span>
      </div>
      <button
        className="category-add-btn"
        onClick={() => {
          setSupplierForm({
            supplierName: '',
            companyName: '',
            contactPerson: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            country: '',
            taxNumber: '',
            notes: ''
          });
          setEditingSupplierId(null);
          setActivePage('Add Supplier');
        }}
      >
        + {t.addSupplier}
      </button>
    </div>
    {/* SUPPLIER TABLE */}
    <div className="medicine-table-container">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t.supplierName}</th>
            <th>{t.companyName}</th>
            <th>{t.phoneNumber}</th>
            <th>{t.emailAddress}</th>
            <th>{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {suppliers
            .filter((supplier) =>
              `${supplier.supplierName} ${supplier.companyName} ${supplier.phone}`
                .toLowerCase()
                .includes(supplierSearch.toLowerCase())
            )
            .map((supplier, index) => (
              <tr key={supplier.id}>
                <td>{index + 1}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.companyName}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>
                  <button
                    onClick={() => setViewSupplier(supplier)}
                  >
                    {t.view}
                  </button>
                  <button
                    onClick={() => {
                      setSupplierForm(supplier);
                      setEditingSupplierId(supplier.id);
                      setActivePage('Add Supplier');
                    }}
                  >
                    {t.edit}
                  </button>
                  <button
                    onClick={() => setDeleteSupplierId(supplier.id)}
                  >
                    {t.delete}
                  </button>
                </td>
              </tr>
            ))}
          {suppliers.filter((supplier) =>
            `${supplier.supplierName} ${supplier.companyName} ${supplier.phone}`
              .toLowerCase()
              .includes(supplierSearch.toLowerCase())
          ).length === 0 && (

            <tr>
              <td colSpan="6">
                {t.noSuppliersFound}
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

    {/* SUPPLIER DETAILS */}

    {viewSupplier && (

      <div className="supplier-details-container">

        <div className="supplier-form-header">

          <h3>{t.supplierDetails}</h3>

          <button onClick={() => setViewSupplier(null)}>
            ✕
          </button>

        </div>

        <div className="supplier-details-grid">

          <p><strong>{t.supplierName}:</strong> {viewSupplier.supplierName}</p>
          <p><strong>{t.companyName}:</strong> {viewSupplier.companyName}</p>
          <p><strong>{t.contactPerson}:</strong> {viewSupplier.contactPerson}</p>
          <p><strong>{t.phoneNumber}:</strong> {viewSupplier.phone}</p>
          <p><strong>{t.emailAddress}:</strong> {viewSupplier.email}</p>
          <p><strong>{t.city}:</strong> {viewSupplier.city}</p>
          <p><strong>{t.country}:</strong> {viewSupplier.country}</p>
          <p><strong>{t.taxNumber}:</strong> {viewSupplier.taxNumber}</p>
          <p><strong>{t.fullAddress}:</strong> {viewSupplier.address}</p>
          <p><strong>{t.notes}:</strong> {viewSupplier.notes}</p>

        </div>

      </div>

    )}

    {/* DELETE CONFIRMATION POPUP */}

    {deleteSupplierId !== null && (

      <div className="delete-confirmation">

        <div className="delete-confirmation-box">

          <h3>{t.delete}?</h3>

          <p>
            {language === 'Urdu'
              ? 'کیا آپ واقعی اس سپلائر کو حذف کرنا چاہتے ہیں؟'
              : language === 'Spanish'
              ? '¿Seguro que quieres eliminar este proveedor?'
              : 'Are you sure you want to delete this supplier?'}
          </p>

          <div className="delete-confirmation-actions">

            <button
              type="button"
              onClick={() => setDeleteSupplierId(null)}
            >
              {t.cancel}
            </button>

            <button
              type="button"
              onClick={confirmDeleteSupplier}
            >
              {language === 'Urdu'
                ? 'سپلائر حذف کریں'
                : language === 'Spanish'
                ? 'Eliminar proveedor'
                : 'Delete Supplier'}
            </button>

          </div>

        </div>

      </div>

    )}

  </div>

) : activePage === 'Customers' ? (

  <div className="page-content customer-dashboard">

    {/* CUSTOMER DASHBOARD */}

    {customerPage === 'Dashboard' ? (

      <>

        <div className="medicine-form-header">

          <h2>{t.customers}</h2>

          <button
            type="button"
            className="customer-add-btn"
            onClick={() => {
              setCustomerForm({
                customerName: '',
                phone: '',
                email: '',
                address: '',
                city: '',
                notes: ''
              });

              setCustomerPage('Add');
            }}
          >
            + {language === 'Urdu'
              ? 'کسٹمر شامل کریں'
              : language === 'Spanish'
              ? 'Agregar cliente'
              : 'Add Customer'}
          </button>

        </div>

        <div className="customer-dashboard-cards">

          {/* TOTAL CUSTOMERS */}

          <div
            className="customer-stat-card"
            onClick={() => {
              setCustomerSearch('');
              setCustomerPage('Total');
            }}
          >

            <div className="customer-stat-icon">👥</div>

            <h3>
              {language === 'Urdu'
                ? 'کل کسٹمرز'
                : language === 'Spanish'
                ? 'Total de clientes'
                : 'Total Customers'}
            </h3>

            <h1>{customers.length}</h1>

            <p>
              {language === 'Urdu'
                ? 'تمام کسٹمرز دیکھیں →'
                : language === 'Spanish'
                ? 'Ver todos los clientes →'
                : 'View all customers →'}
            </p>

          </div>

          {/* NEW CUSTOMERS */}

          <div
            className="customer-stat-card"
            onClick={() => {
              setCustomerSearch('');
              setCustomerPage('New');
            }}
          >

            <div className="customer-stat-icon">✨</div>

            <h3>
              {language === 'Urdu'
                ? 'نئے کسٹمرز'
                : language === 'Spanish'
                ? 'Nuevos clientes'
                : 'New Customers'}
            </h3>

            <h1>
              {customers.filter((customer) => {
                if (!customer.createdAt) return false;

                const last30Days = new Date();
                last30Days.setDate(last30Days.getDate() - 30);

                return new Date(customer.createdAt) >= last30Days;
              }).length}
            </h1>

            <p>
              {language === 'Urdu'
                ? 'نئے کسٹمرز دیکھیں →'
                : language === 'Spanish'
                ? 'Ver nuevos clientes →'
                : 'View new customers →'}
            </p>

          </div>

        </div>

      </>

    ) : customerPage === 'Add' ? (

      /* ADD CUSTOMER FORM */

      <>

        <div className="medicine-form-header">

          <h2>
            {language === 'Urdu'
              ? 'نیا کسٹمر شامل کریں'
              : language === 'Spanish'
              ? 'Agregar nuevo cliente'
              : 'Add New Customer'}
          </h2>

          <button
            type="button"
            onClick={() => setCustomerPage('Dashboard')}
          >
            {t.back}
          </button>

        </div>

        <div className="medicine-form">

          <div className="form-group">
            <label>
              {language === 'Urdu' ? 'کسٹمر کا نام' : language === 'Spanish' ? 'Nombre del cliente' : 'Customer Name'}
            </label>

            <input
              type="text"
              value={customerForm.customerName}
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  customerName: e.target.value
                })
              }
            />
          </div>

          <div className="form-group">
            <label>{t.phoneNumber}</label>

            <input
              type="tel"
              value={customerForm.phone}
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  phone: e.target.value
                })
              }
            />
          </div>

          <div className="form-group">
            <label>{t.emailAddress}</label>

            <input
              type="email"
              value={customerForm.email}
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  email: e.target.value
                })
              }
            />
          </div>

          <div className="form-group">
            <label>{t.city}</label>

            <input
              type="text"
              value={customerForm.city}
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  city: e.target.value
                })
              }
            />
          </div>

          <div className="form-group full-width">
            <label>{t.fullAddress}</label>

            <textarea
              value={customerForm.address}
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  address: e.target.value
                })
              }
            />
          </div>

          <div className="form-group full-width">
            <label>{t.notes}</label>

            <textarea
              value={customerForm.notes}
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  notes: e.target.value
                })
              }
            />
          </div>

          <div className="medicine-form-actions">

            <button
              type="button"
              onClick={() => setCustomerPage('Dashboard')}
            >
              {t.cancel}
            </button>

            <button
              type="button"
              onClick={() => {

                if (!customerForm.customerName.trim()) {
                  alert(
                    language === 'Urdu'
                      ? 'کسٹمر کا نام درج کریں'
                      : language === 'Spanish'
                      ? 'Ingrese el nombre del cliente'
                      : 'Please enter customer name'
                  );

                  return;
                }

                setCustomers([
                  ...customers,
                  {
                    ...customerForm,
                    id: Date.now(),
                    createdAt: new Date().toISOString()
                  }
                ]);

                setCustomerForm({
                  customerName: '',
                  phone: '',
                  email: '',
                  address: '',
                  city: '',
                  notes: ''
                });

                setCustomerPage('Dashboard');

              }}
            >
              {language === 'Urdu'
                ? 'کسٹمر محفوظ کریں'
                : language === 'Spanish'
                ? 'Guardar cliente'
                : 'Save Customer'}
            </button>

          </div>

        </div>

      </>

    ) : (

      /* TOTAL AND NEW CUSTOMERS LIST */

      <>

        <div className="medicine-form-header">

          <h2>
            {customerPage === 'Total'
              ? language === 'Urdu'
                ? 'تمام کسٹمرز'
                : language === 'Spanish'
                ? 'Todos los clientes'
                : 'All Customers'
              : language === 'Urdu'
              ? 'نئے کسٹمرز'
              : language === 'Spanish'
              ? 'Nuevos clientes'
              : 'New Customers'}
          </h2>

          <button
            type="button"
            onClick={() => setCustomerPage('Dashboard')}
          >
            {t.back}
          </button>

        </div>

        <div className="category-search-box">

          <input
            type="text"
            placeholder={
              language === 'Urdu'
                ? 'کسٹمر تلاش کریں'
                : language === 'Spanish'
                ? 'Buscar cliente'
                : 'Search Customer'
            }
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
          />

          <span>⌕</span>

        </div>
        <div className="medicine-table-container">

          <table className="medicine-table">

            <thead>
              <tr>
                <th>#</th>
                <th>
                  {language === 'Urdu' ? 'نام' : language === 'Spanish' ? 'Nombre' : 'Customer Name'}
                </th>
                <th>{t.phoneNumber}</th>
                <th>{t.emailAddress}</th>
                <th>{t.city}</th>
                <th>{t.actions}</th>
              </tr>
            </thead>

            <tbody>

              {customers
                .filter((customer) => {

                  const matchesSearch =
                    `${customer.customerName} ${customer.phone} ${customer.email} ${customer.city}`
                      .toLowerCase()
                      .includes(customerSearch.toLowerCase());

                  if (customerPage === 'New') {
                    if (!customer.createdAt) return false;

                    const last30Days = new Date();
                    last30Days.setDate(last30Days.getDate() - 30);

                    return matchesSearch &&
                      new Date(customer.createdAt) >= last30Days;
                  }

                  return matchesSearch;

                })
                .map((customer, index) => (

                  <tr key={customer.id}>

                    <td>{index + 1}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.city}</td>

                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          alert(
                            `${customer.customerName}\n${customer.phone}\n${customer.email}\n${customer.city}\n${customer.address}`
                          );
                        }}
                      >
                        {t.view}
                      </button>
                    </td>

                  </tr>

                ))}

              {customers.filter((customer) => {

                const matchesSearch =
                  `${customer.customerName} ${customer.phone} ${customer.email} ${customer.city}`
                    .toLowerCase()
                    .includes(customerSearch.toLowerCase());

                if (customerPage === 'New') {
                  if (!customer.createdAt) return false;

                  const last30Days = new Date();
                  last30Days.setDate(last30Days.getDate() - 30);

                  return matchesSearch &&
                    new Date(customer.createdAt) >= last30Days;
                }

                return matchesSearch;

              }).length === 0 && (

                <tr>
                  <td colSpan="6">
                    {language === 'Urdu'
                      ? 'کوئی کسٹمر نہیں ملا'
                      : language === 'Spanish'
                      ? 'No se encontraron clientes'
                      : 'No customers found'}
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </>

    )}

  </div>

) : activePage === 'Add Supplier' ? (

  <div className="page-content supplier-form-page">

    <div className="medicine-form-header">

      <h2>
        {editingSupplierId ? t.editSupplier : t.addSupplier}
      </h2>

      <button onClick={() => setActivePage('Suppliers')}>
        {t.back}
      </button>

    </div>

    <div className="medicine-form">

      <div className="form-group">
        <label>{t.supplierName}</label>
        <input
          type="text"
          value={supplierForm.supplierName}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              supplierName: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.companyName}</label>
        <input
          type="text"
          value={supplierForm.companyName}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              companyName: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.contactPerson}</label>
        <input
          type="text"
          value={supplierForm.contactPerson}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              contactPerson: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.phoneNumber}</label>
        <input
          type="tel"
          value={supplierForm.phone}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              phone: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.emailAddress}</label>
        <input
          type="email"
          value={supplierForm.email}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              email: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.city}</label>
        <input
          type="text"
          value={supplierForm.city}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              city: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.country}</label>
        <input
          type="text"
          value={supplierForm.country}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              country: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.taxNumber}</label>
        <input
          type="text"
          value={supplierForm.taxNumber}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              taxNumber: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.fullAddress}</label>
        <textarea
          value={supplierForm.address}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              address: e.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>{t.notes}</label>
        <textarea
          value={supplierForm.notes}
          onChange={(e) =>
            setSupplierForm({
              ...supplierForm,
              notes: e.target.value
            })
          }
        />
      </div>

      <div className="medicine-form-actions">

        <button onClick={() => setActivePage('Suppliers')}>
          {t.cancel}
        </button>

        <button
          onClick={() => {

            if (!supplierForm.supplierName.trim()) {
              alert(t.supplierName);
              return;
            }

            if (editingSupplierId !== null) {

              setSuppliers(
                suppliers.map((supplier) =>
                  supplier.id === editingSupplierId
                    ? {
                        ...supplierForm,
                        id: editingSupplierId
                      }
                    : supplier
                )
              );
            } else {
              setSuppliers([
                ...suppliers,
                {
                  ...supplierForm,
                  id: Date.now()
                }
              ]);
            }
            setEditingSupplierId(null);
            setActivePage('Suppliers');
          }}
        >
          {editingSupplierId ? t.updateSupplier : t.saveSupplier}
        </button>
      </div>
    </div>
  </div>
) : activePage === 'Medicine Management' ? (
  <div className="page-content medicine-management-page">
    <div className="medicine-form-header">
      <h2>{t.medicineManagement}</h2>
      <button
  type="button"
  onClick={() => setShowScanner(true)}
>
  📷 {t.scanMedicine}
</button>
      <button
        type="button"
        onClick={() => {
          setMedicineForm({
            name: '',
            medicineId: '',
            category: '',
            manufacturer: '',
            purchasePrice: '',
            sellingPrice: '',
            quantity: '',
            expiryDate: '',
            image: null,
            description: ''
          });
          setEditingMedicineId(null);
          setActivePage('Add Medicine');
        }}
      >
        + {t.addMedicine}
      </button>
    </div>
    <div className="category-search-box">
      <input
        type="text"
        placeholder={t.searchMedicine}
        value={medicineSearch}
        onChange={(e) => setMedicineSearch(e.target.value)}
      />
      <span>⌕</span>
    </div>
    <div className="medicine-table-container">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t.medicineName}</th>
            <th>{t.category}</th>
            <th>{t.manufacturer}</th>
            <th>{t.purchasePrice}</th>
            <th>{t.sellingPrice}</th>
            <th>{t.quantity}</th>
<th>{t.barcode}</th>
<th>{t.qrCode}</th>
<th>{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {medicines
            .filter((medicine) =>
              `${medicine.name} ${medicine.category} ${medicine.manufacturer}`
                .toLowerCase()
                .includes(medicineSearch.toLowerCase())
            )
            .map((medicine, index) => (
              <tr key={medicine.id}>
                <td>{index + 1}</td>
                <td>{medicine.name}</td>
                <td>{medicine.category}</td>
                <td>{medicine.manufacturer || '—'}</td>
                <td>{medicine.purchasePrice ?? '—'}</td>
                <td>{medicine.price || medicine.sellingPrice}</td>
                <td>{medicine.quantity || medicine.stock}</td>
                <td>{medicine.barcode || '—'}</td>
                <td>{medicine.qrCode || '—'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      setMedicineForm({
                        ...medicine,
                        sellingPrice: medicine.sellingPrice || medicine.price || '',
                        quantity: medicine.quantity || medicine.stock || ''
                      });
                      setEditingMedicineId(medicine.id);
                      setActivePage('Add Medicine');
                    }}
                  >
                    {t.edit}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(
                        language === 'Urdu'
                          ? 'کیا آپ یہ دوا حذف کرنا چاہتے ہیں؟'
                          : language === 'Spanish'
                          ? '¿Desea eliminar este medicamento?'
                          : 'Are you sure you want to delete this medicine?'
                      )) {
                        setMedicines((prev) =>
                          prev.filter((item) => item.id !== medicine.id)
                        );
                      }
                    }}
                  >
                    {t.delete}
                  </button>
                </td>
              </tr>
            ))}
          {medicines.filter((medicine) =>
            `${medicine.name} ${medicine.category} ${medicine.manufacturer}`
              .toLowerCase()
              .includes(medicineSearch.toLowerCase())
          ).length === 0 && (
            <tr>
              <td colSpan="10">{t.noMedicines}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
) : activePage === 'Add Medicine' ? (
  <div className="page-content">
    <div className="medicine-form-header">
      <h2>{t.addMedicine}</h2>
      <button
        type="button"
        onClick={() => setActivePage('Medicine Management')}
      >
        {t.back}
      </button>
    </div>
    <form
      className="medicine-form"
      onSubmit={handleSaveMedicine}
      onReset={() =>
  setMedicineForm({
    name: '',
    medicineId: '',
    category: '',
    manufacturer: '',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    expiryDate: '',
    barcode: '',
    qrCode: '',
    image: null,
    description: ''
  })
}
    >
      <div className="form-group">
        <label>{t.medicineName}</label>
        <input
          type="text"
          placeholder={t.medicineName}
          value={medicineForm.name}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              name: e.target.value
            })
          }
        />
      </div>
      <div className="form-group">
        <label>{t.medicineId}</label>
        <input
          type="text"
          value="MED-001"
          readOnly
        />
      </div>
      <div className="form-group">
  <label>
    {language === 'Urdu'
      ? 'بارکوڈ'
      : language === 'Spanish'
      ? 'Código de barras'
      : 'Barcode'}
  </label>

  <input
    type="text"
    placeholder="Enter Barcode"
    value={medicineForm.barcode}
    onChange={(e) =>
      setMedicineForm({
        ...medicineForm,
        barcode: e.target.value
      })
    }
  />
</div>
<div className="form-group">
  <label>
    {language === 'Urdu'
      ? 'کیو آر کوڈ'
      : language === 'Spanish'
      ? 'Código QR'
      : 'QR Code'}
  </label>
  <input
    type="text"
    placeholder="Enter QR Code"
    value={medicineForm.qrCode}
    onChange={(e) =>
      setMedicineForm({
        ...medicineForm,
        qrCode: e.target.value
      })
    }
  />
</div>
<div className="form-group">
  <label>{t.manufacturer}</label>
  <input
    type="text"
    placeholder={t.manufacturer}
    value={medicineForm.manufacturer}
    onChange={(e) =>
      setMedicineForm({
        ...medicineForm,
        manufacturer: e.target.value
      })
    }
  />
</div>
<div className="form-group">
  <label>{t.purchasePrice}</label>
  <input
    type="number"
    placeholder={t.purchasePrice}
    value={medicineForm.purchasePrice}
    onChange={(e) =>
      setMedicineForm({
        ...medicineForm,
        purchasePrice: e.target.value
      })
    }
  />
</div>
      <div className="form-group">
        <label>{t.category}</label>
        <select
          value={medicineForm.category}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              category: e.target.value
            })
          }
        >
          <option value="" disabled>
            {t.selectCategory}
          </option>
          {categories
            .filter((category) =>
              category.name
                .toLowerCase()
                .includes(categorySearch.toLowerCase())
            )
            .map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>{t.manufacturer}</label>
        <input
          type="text"
          placeholder={t.manufacturer}
          value={medicineForm.manufacturer}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              manufacturer: e.target.value
            })
          }
        />
      </div>
      <div className="form-group">
        <label>{t.purchasePrice}</label>
        <input
          type="number"
          min="0"
          placeholder={t.purchasePrice}
          value={medicineForm.purchasePrice}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              purchasePrice: e.target.value
            })
          }
        />
      </div>
      <div className="form-group">
        <label>{t.sellingPrice}</label>
        <input
          type="number"
          min="0"
          placeholder={t.sellingPrice}
          value={medicineForm.sellingPrice}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              sellingPrice: e.target.value
            })
          }
        />
      </div>
      <div className="form-group">
        <label>{t.quantity}</label>
        <input
          type="number"
          min="0"
          placeholder={t.quantity}
          value={medicineForm.quantity}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              quantity: e.target.value
            })
          }
        />
      </div>
      <div className="form-group">
        <label>{t.expiryDate}</label>
        <input
          type="date"
          value={medicineForm.expiryDate}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              expiryDate: e.target.value
            })
          }
        />
      </div>
      <div className="form-group">
        <label>{t.medicineImage}</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              image: e.target.files[0]
            })
          }
        />
      </div>
      <div className="form-group full-width">
        <label>{t.description}</label>
        <textarea
          rows="4"
          placeholder={t.description}
          value={medicineForm.description}
          onChange={(e) =>
            setMedicineForm({
              ...medicineForm,
              description: e.target.value
            })
          }
        />
      </div>
      <div className="medicine-form-actions">
        <button type="reset" className="save-product-btn">
          {t.reset}
        </button>
        <button
          type="button"
          className="save-product-btn"
          onClick={() => setActivePage('Medicine Management')}
        >
          {t.cancel}
        </button>
        <button type="submit" className="save-product-btn">
          {editingMedicineId !== null
            ? t.saveChanges
            : t.saveMedicine}
        </button>
      </div>
    </form>
  </div>
) : activePage === 'Inventory' ? (
  <div className="page-content">
    <h2>{t.inventory}</h2>
  </div>
) : activePage === 'Settings' || activePage === 'Admin Profile' ? (
  null
) : (
  <div className="page-content">
    <h2>{activePage}</h2>
  </div>
)}
</main>
</div>
)
}
export default App
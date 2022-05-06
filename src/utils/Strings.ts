export default class{
    static appName:string = "لوحة تحكم نظام البلاغات";
    static menuColor :string = '#F9F9F9';
    // --------------------------------------------------------------- //
    // control page direction
    static  PAGE_DIR  = "rtl";
    static isRtl = false;
    // --------------------------------------------------------------- //
    // sign in strings
    static userName :string = "اسم المستخدم";
    static password :string = "كلمة المرور";
    static signInButtonText :string = "تسجيل الدخول";
    static rememberMe  :string = "تذكرني";
    static forgetPassword  :string = "نسيت كلمة المرور";
    static dontHaveAccount  :string = " ليس لديك حساب ؟ سجل الأن";
    static allRightsReserved: string = "جميع الحقوق محفوظة";
    static add: string = "اضافة";
    static firstName: string = "الأسم الأول";
    static lastName: string = "الأسم الأخير";
    static email: string = "الايميل";
    static activeUser: string = "تفعيل المستخدم";
    static activeCitizen: string = "تفعيل حساب المواطن";
    static normalUser : string = "مستخدم عادي";
    static admin : string = "مدير";
    static permission :string = "الصلاحية";
    static userCreated :string = "تم انشاء المستخدم";
    static userNotCreated :string = "توجد مشكلة في البيانات";
    static edit : string = "تعديل";
    static citizen : string = " مواطن ";
    static citizens : string = " المواطنون ";
    static user :string = " مستخدم ";
    static users : string = " المستخدمون ";
    static abouts : string = " معلومات اضافية ";
    static police_offices : string = " مراكز الشرطة ";
    // --------------------------------------------------------------- //
    // drawer menu items
    static menuMain: string = "الرئيسية";
    static menuUsers: string = "المستخدمين";
    static menuCitizen: string = "المواطنون";
    static menuReports: string = "البلاغات";
    static menuPolicesOffices: string = "مراكز الشرطة";
    static menuAdditionInfo: string = "معلومات اضافية";
    // --------------------------------------------------------------- //
    // dashboard strings
    static userCounts:string = "عدد المستخدمين";
    static reportCount:string = "عدد التقارير";
    static citizenCount:string = "عدد المواطنين";
    static myProfile:string = "حسابي";
    static logout : string = "تسجيل الخروج";
    static id: string = "الرقم";
    static isActive: string = "حالة الحساب";
    static createdAt: string = "تاريخ الانشاء";
    static updatedAt: string = "تاريخ التعديل";
    static fullName: string = "الأسم الكامل";
    static repoterName: string = "اسم صاحب البلاغ";
    static delete : string = "حذف";
    // --------------------------------------------------------------- //
    static no : string = "لا";
    static areYouSureToDelete : string = "هل أنت متأكد من عملة الحذف";
    static youCantUndoThisStep : string = "ملاحظة في حالة موافقتك على هذا الاجراء فأنك لن تستطيق التراجع";
    // --------------------------------------------------------------- //
    static unauthorized : string = "يرجى التاكد من بياناتك";
  static youMustfillData: string = "يجب عليك تعبئة البيانات";
  static phone: string = "رقم الهاتف";
  static city: string = "المدينة";
  static location: string = "الموقع";
  static office_name : string = " اسم المركز ";
  static police_office : string = " مركز شرطة ";
  static fieldValue: string = 'قيمة لحقل';
  static fieldName : string = 'اسم الحقل';
  static fields: string = ' معلومات  ';
  static about : string = ' حقول اضافية ' ;
  // init value to map 
  static initMap = {
    lat: 32.36447150118714,
    lng : 15.16091104212196
  };
  // --------------------------------------------------- //
  static reportDesc: string = "وصف البلاغ";
  static reportType: string = "نوع البلاغ";
  static reprortState: string = "حالة البلاغ";
  static reportImage: string = "صورة البلاغ";
  static API_URL : string = "http://localhost:4000/";
  static report: string = " بلاغ ";
  static reports: string = " البلاغات ";

}
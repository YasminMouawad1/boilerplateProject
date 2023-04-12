export abstract class UrlEndpoints {
  //======================================= SHARED  =======================================

  static readonly POST_LOCATION: string = ' ';

  //======================================= Module X =======================================
  // Order
  static readonly GET_TEST: string = 'test';

  // USer List
  static readonly GET_WaitingRiskApprovalList: string = 'api/services/app/Risk/ProfilePlus';
  static readonly GET_PermanentRejectedProfilePlusList: string = 'api/services/app/Risk/PermanentRejectedProfilePlus';
  static readonly GET_RejectedProfilePlusList: string = 'api/services/app/Risk/RejectedProfilePlus';
  static readonly GET_RejectedProfilePlusSystemErrors: string = 'api/services/app/Risk/RejectedProfilePlusSystemErrors';
  static readonly GET_ReviwList: string = 'api/services/app/Risk/ReviewProfilePlus';
  static readonly GET_UserById: string = 'api/services/app/Risk/GetUserDocumentsByClientId?MobileNumber=';
  static readonly GET_RejectResponse: string = 'api/services/app/Risk/GetRejectResponse';
  static readonly POST_AllUsersList: string = 'api/services/app/Risk/ClientSearch?clientName=';
  static readonly GET_ALLActivationPoint: string = 'api/services/app/PortalRegistrationUsers/GetActivarionPoints';
  static readonly GET_ActivationPointByID: string = 'api/services/app/PortalRegistrationUsers/GetActivarionPoint?id=';
  

  static readonly POST_RegisterationUser: string = 'api/services/app/PortalRegistrationUsers/RegistrationPortalUsers';
  static readonly POST_GetUSerByID: string = 'api/services/app/PortalRegistrationUsers/MerchantUserById';
  

  static readonly GET_MerchantSettlementPlan: string = 'api/services/app/PortalRegistrationUsers/GetMerchanstsSettlementPlan';
  static readonly GET_MerchantSettlementPlanByID: string = 'api/services/app/PortalRegistrationUsers/GetMerchanstsSettlementPlanById?merchanstsCode=';

  //register users
  static readonly GET_MerchantsPortalUsers: string  = 'api/services/app/PortalRegistrationUsers/GetMerchantsPortalUsers';
  static readonly GET_MerchantPurchaseUsers: string  = 'api/services/app/PortalRegistrationUsers/GetMerchantPurchaseUsers';
  static readonly GET_MerchantActivators: string  = 'api/services/app/PortalRegistrationUsers/GetMerchantActivators';

  static readonly Post_PURCHASEUSER: string  = 'api/services/app/PortalRegistrationUsers/RegistrationPurchaseUser';
  static readonly Post_ACTIVATORUSER: string  = 'api/services/app/PortalRegistrationUsers/RegistrationActivatorUsers';
 
  static readonly Get_ClientActivation: string = 'api/Risk/ClientActivation?mobileNumber=';
  static readonly GET_RiskRejectedOnlyList: string = 'api/Risk/ProfilePlus?isRejectedOnly='+true;

  //static readonly GET_UserById: string = 'api/Risk/GetUserDocumentsByClientId?MobileNumber=';
  static readonly POST_ApproveUser: string = 'api/services/app/Risk/Approve';
  static readonly POST_SoftApproveUser: string = 'api/Risk/SoftApprove';
  static readonly Edit_RiskLimit: string = 'api/Risk/EditRiskLimt';
  static readonly POST_EditRiskClientNote: string = 'api/services/app/Risk/EditRiskClientNote?userMobile=';

static readonly post_UpdateNationalIdData: string = 'api/services/app/Risk/EditNationalIDData';
static readonly GET_maritalStatus: string = 'api/services/app/LookUp/GetMaritalStatus';


static readonly GET_callNationalId: string = 'api/Risk/CallNationalId?nid=';

static readonly post_AddClientDocument: string = 'api/Risk/AddClientDocument';

static readonly GET_BulkonBoradingList: string = 'api/services/app/Risk/GetAllCorporate';
 

  //bulkOnBorading
  static readonly GET_onBoradingList: string = 'api/services/app/LookUp/GetAllCorporate';
  static readonly GET_CorpProfilePlus: string = 'api/services/app/Risk/CorpProfilePlus?corpCode=';
  static readonly GET_UserDocumentsByClientId: string = 'api/Risk/getUserDocumentsByClientId?MobileNumber=';
  static readonly POST_softApproveCorporate: string = 'api/Risk/softApproveCorporate';
 

  
  // Reject Response
  //static readonly GET_RejectResponse: string = 'api/Risk/RejectResponse';


//System Configuration

static readonly GET_SystemConfiguration: string = 'api/SystemConfiguration/GetSystemConfiguration';
static readonly Update_SystemCoreConfiguration: string = 'api/SystemConfiguration/UpdateSystemCoreConfiguration';
static readonly Get_SystemConfigurationProfessionsList: string = 'api/SystemConfiguration/GetSystemConfigurationProfessionsList';

static readonly Get_SystemConfigurationProfessionsById: string = 'api/SystemConfiguration/GetSystemConfigurationProfessionsById?Id=';
static readonly Get_SystemRejectionReasonById: string = 'api/SystemConfiguration/GetSystemConfigurationRiskRejectionReasonById?Id=';


static readonly Get_SystemConfigurationRejectionReasonList: string = 'api/SystemConfiguration/GetSystemConfigurationRiskRejectionReasonList';

static readonly post_CreateSystemConfiguration: string = 'api/SystemConfiguration/CreateSystemConfigurationProfessions';
static readonly post_CreateSystemRejectionReason: string = 'api/SystemConfiguration/CreateSystemConfigurationRiskRejectionReason';

static readonly Get_DeleteSystemConfigurationProfessionsById: string = 'api/SystemConfiguration/deleteSystemConfigurationProfessionsById';
static readonly Get_DeleteSystemRiskRejectionReasonById: string = 'api/SystemConfiguration/DeleteSystemConfigurationRiskRejectionReasonById';

static readonly Get_ActiveSystemConfigurationProfessionsById: string = 'api/SystemConfiguration/ActiveSystemConfigurationProfessionsById';
static readonly Get_ActiveSystemConfigurationRiskRejectionReasonById: string = 'api/SystemConfiguration/ActiveSystemConfigurationRiskRejectionReasonById';

static readonly post_UpdateSystemConfigurationProfessions: string = 'api/SystemConfiguration/UpdateSystemConfigurationProfessions';
static readonly post_UpdateSystemConfiguratioRejectionReason: string = 'api/SystemConfiguration/updateSystemConfigurationRiskRejectionReason';



 // LookUps
 static readonly GET_ClubIds: string = 'api/LookUps/ClubIds';
 static readonly POST_ClubId: string = 'api/LookUps/ClubId';
 static readonly GET_CarBrand: string = 'api/LookUps/CarBrands';
 static readonly POST_CarBrand: string = 'api/LookUps/CarBrand';
 static readonly POST_CarModel: string = 'api/LookUps/CarModel';
 static readonly GET_Governorates: string = 'api/LookUps/Governorates';
 static readonly GET_EmploymentTypes: string = 'api/LookUps/EmploymentTypes';

  // POST_TOKEN_AUTH:
  static readonly POST_TOKEN_AUTH: string = "api/Auth/Risklogin";

  // Rating (questions)
  static readonly GET_QUESTIONS: string = 'services/app/Questions/GetAll';
  static readonly ADD_QUESTION: string = 'services/app/Questions/CreateOrEdit/';
  static readonly DELETE_QUESTION: string = 'services/app/Questions/Delete?Id=';
  static readonly GET_QUESTION_FOREDIT: string = 'services/app/Questions/GetQuestionForEdit?Id=';

  static readonly UPDATE_QUESTIONS: string = ' ';;

  // School Level For Table Dropdown
  static readonly GET_SCHOOLLEVELFORDROPDOWN: string = 'services/app/Questions/GetAllSchoolLevelForTableDropdown';

  //  Semester For Table Dropdown
  static readonly GET_SEMESTERFORDROPDOWN: string = 'services/app/Questions/GetAllSemesterForTableDropdown';

  //  Subject For Table Dropdown
  static readonly GET_SUBJECTFORDROPDOWN: string = 'services/app/Questions/GetAllSubjectForTableDropdown';

  //  Lesson For Table Dropdown
  static readonly GET_LESSONFORDROPDOWN: string = 'services/app/Questions/GetAllLessonForTableDropdown';

  //  Questions Difficalty For Table Dropdown
  static readonly GET_QUESTIONSDIFFICALTYFORDROPDOWN: string = 'services/app/Questions/GetAllQuestionsDifficaltyForTableDropdown';


}

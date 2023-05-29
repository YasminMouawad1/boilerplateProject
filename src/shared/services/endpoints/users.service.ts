import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { UrlEndpoints } from './url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _API: APIService) { }

  // Get All Users List
  getWaitingRiskApprovalList(isRejectedOnly :boolean = false, page :number = 1 ,pageSize :number = 10){
    return this._API.doGet(UrlEndpoints.GET_WaitingRiskApprovalList+'?isRejectedOnly='+isRejectedOnly+'&page='+page+'&pageSize='+pageSize)
  }

  getMerchantSettlementPlan(){
    return this._API.doGet(UrlEndpoints.GET_MerchantSettlementPlan);
  }

  getActivationPoints(){
    return this._API.doGet(UrlEndpoints.GET_ALLActivationPoint);
  }

  getLimitReviw(page :number = 1 ,pageSize :number = 10){
    return this._API.doGet(UrlEndpoints.GET_ReviwList+'?page='+page+'&pageSize='+pageSize)
  }

  getBulkBorading(page :number = 1 ,pageSize :number = 10){
    return this._API.doGet(UrlEndpoints.GET_onBoradingList+'?page='+page+'&pageSize='+pageSize)
  }


  getBulkBoradingList(page :number = 1 ,pageSize :number = 10){
    return this._API.doGet(UrlEndpoints.GET_BulkonBoradingList+'?page='+page+'&pageSize='+pageSize)
  }

getAllCoporates(){
  
}


  getCorpProfilePlus(code: Number){
    return this._API.doGet(UrlEndpoints.GET_CorpProfilePlus + code)
  }

  getUserDocumentsByClientId(mobileNumber: string){
    return this._API.doGet(UrlEndpoints.GET_UserDocumentsByClientId + mobileNumber)
  }

  getMerchantPlanByID(merchantCode: string){
    return this._API.doGet(UrlEndpoints.GET_MerchantSettlementPlanByID + merchantCode)
  }

  getActivationByID(pointID: number){
    return this._API.doGet(UrlEndpoints.GET_ActivationPointByID + pointID)
  }

  getMerchantUserByID(body:any){
    return this._API.doPost(UrlEndpoints.POST_GetUSerByID ,body)
  }


  softApproveCorporate(corpApprove: any){
    return this._API.doPost(UrlEndpoints.POST_softApproveCorporate, corpApprove)
  }

  registerationUser(body: any){
    return this._API.doPost(UrlEndpoints.POST_RegisterationUser, body)
    
  }

  getUserById(id: string){
return this._API.doGet(UrlEndpoints.GET_UserById + id)
  }

  getRequestDetails(publicId: string){
    return this._API.doGet(UrlEndpoints.GET_RequestsDetils + publicId)
      }

  postUser(userApprove: any){
    return this._API.doPost(UrlEndpoints.POST_ApproveUser, userApprove)
  }



  EditRiskClientNote(userData:any){
    return this._API.doPost(UrlEndpoints.POST_EditRiskClientNote+userData.userMobile+'&note='+userData.note,userData)
  }

  EditUserNationalIdData(userData:any){
    return this._API.doPost(UrlEndpoints.post_UpdateNationalIdData, userData)
  }
  softApproveUser(userApprove: any){
    return this._API.doPost(UrlEndpoints.POST_SoftApproveUser, userApprove)
  }
  editRiskLimit(userApprove: any){
    return this._API.doPost(UrlEndpoints.Edit_RiskLimit, userApprove)
  }


  getRejectResponse(){
    return this._API.doGet(UrlEndpoints.GET_RejectResponse)
  }

  getmaritalStatus(){
    return this._API.doGet(UrlEndpoints.GET_maritalStatus)
  }

  getRiskRejectedProfileList(page :number = 1 ,pageSize :number = 10 ){
    return this._API.doGet(UrlEndpoints.GET_RejectedProfilePlusList+'?page='+page+'&pageSize='+pageSize)
  }


  getRejectedProfilePlusSystemErrors(page :number = 1 ,pageSize :number = 10){
    return this._API.doGet(UrlEndpoints.GET_RejectedProfilePlusSystemErrors+'?page='+page+'&pageSize='+pageSize)
  }

  getAllUsersList(name:string){
    return this._API.doPost(UrlEndpoints.POST_AllUsersList+name,name)
  }

  

  getRiskPermanentRejectedProfileList(page :number = 1 ,pageSize :number = 10 ){
    return this._API.doGet(UrlEndpoints.GET_PermanentRejectedProfilePlusList+'?page='+page+'&pageSize='+pageSize)
  }

  getClientActivation( mobileNumber : string){
    return this._API.doGet(UrlEndpoints.Get_ClientActivation+mobileNumber)
  }


  callNationalId(nationalId:string){
    return this._API.doGet(UrlEndpoints.GET_callNationalId+nationalId);
  }

  addCleintDocument(DocData:any){
    return this._API.doPost(UrlEndpoints.post_AddClientDocument, DocData)
  }


  getMerchantPortalUsers(){
    return this._API.doGet(UrlEndpoints.GET_MerchantsPortalUsers);
  }

  getMerchantPurchaseUsers(){
    return this._API.doGet(UrlEndpoints.GET_MerchantPurchaseUsers);
  }

  getMerchantActivators(){
    return this._API.doGet(UrlEndpoints.GET_MerchantActivators);
  }

  addPurchaseUsers(body:any){
    return this._API.doPost(UrlEndpoints.Post_PURCHASEUSER, body)
  }

  addActivatorUsers(body:any){
    return this._API.doPost(UrlEndpoints.Post_ACTIVATORUSER, body)
  }

  RequestsDataGetAll(requestStatus:any){
    return this._API.doGet(UrlEndpoints.Get_RequestDataGetAll+'?RequestStatus='+requestStatus)
  }

  GetAllChekerPending(){
    return this._API.doGet(UrlEndpoints.Get_GetCheckerPendingRequest)
  }

  setBulkAssignmentForChecker(AssignmentCount:number){
    return this._API.doPost(UrlEndpoints.POST_BulkAssignmentForChecker+AssignmentCount,AssignmentCount)
  }
  AddComent(requestID:any,comment:any){
    return this._API.doPost(UrlEndpoints.POST_AddComment+'?requestId='+requestID+'&comment='+comment,comment)
  }

  EditComent(requestID:any,commentID:any,comment:any){
    return this._API.doPost(UrlEndpoints.PUT_UpdateComment+'?requestId='+requestID+'&commentId='+commentID+'&comment='+comment,comment)
  }

  ReleaseAssignment(requestID:any){
    return this._API.doPost(UrlEndpoints.POST_ReleaseAssignment+requestID,requestID);
  }

  CahngeRequestStatus(data:any){
    return this._API.doPost(UrlEndpoints.POST_ChangeRequestStatus+'?requestId='+data.requestId+
    '&systemRiskLimit='+data.systemRiskLimit+'&riskApprovedLimit='+data.riskApprovedLimit+'&programID='+data.programID+
    '&requestStatus='+data.requestStatus+'&comment='+data.comment,data)
  }

  SetBulkAssgnment(data:any){
    return this._API.doPost(UrlEndpoints.POST_SetBulkAssignment+'?requestStatus='+data.requestStatus+'&AssignmentCount='+data.AssignmentCount,data)
  }


  GetAllPrograms(){
    return this._API.doGet(UrlEndpoints.Get_ProgamGetAll)
  }

  AddProgram(data:any){
    return this._API.doPost(UrlEndpoints.POST_ProgramAdd,data)
  }

  getProgramByID(id:number){
    return this._API.doGet(UrlEndpoints.GET_ProgramGetByID + id)
  }

  EditProgram(data:any){
    return this._API.doPut(UrlEndpoints.PUT_UpdateProgrm,data)
  }

  DeleteProgram(id:number){
    return this._API.doDelete(UrlEndpoints.Del_ProgramByID+id)
  }

  GetSystemConfigurationProfessionsList(){
    return  this._API.doGet(UrlEndpoints.Get_SystemConfigurationProfessionsList)
  }

  deleteSystemConfigurationProfessionsById(profession:any){
    return   this._API.doGet(UrlEndpoints.Get_DeleteSystemConfigurationProfessionsById+'?Id='+profession.id+'&isDeleted='+profession.isDeleted)
  }

  activeSystemConfigurationProfessionsById(profession:any){
    return   this._API.doGet(UrlEndpoints.Get_ActiveSystemConfigurationProfessionsById+'?Id='+profession.id+'&isActive='+profession.isActive)
  }

  createSystemCongifurationProfession(configuration:any){
    return   this._API.doPost(UrlEndpoints.post_CreateSystemConfiguration, configuration)
  }



}


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

  getLimitReviw(page :number = 1 ,pageSize :number = 10){
    return this._API.doGet(UrlEndpoints.GET_ReviwList+'?page='+page+'&pageSize='+pageSize)
  }

  getBulkBorading(page :number = 1 ,pageSize :number = 10){
    return this._API.doGet(UrlEndpoints.GET_onBoradingList+'?page='+page+'&pageSize='+pageSize)
  }

  getCorpProfilePlus(code: Number){
    return this._API.doGet(UrlEndpoints.GET_CorpProfilePlus + code)
  }

  getUserDocumentsByClientId(mobileNumber: string){
    return this._API.doGet(UrlEndpoints.GET_UserDocumentsByClientId + mobileNumber)
  }

  softApproveCorporate(corpApprove: any){
    return this._API.doPost(UrlEndpoints.POST_softApproveCorporate, corpApprove)
  }

  getUserById(id: string){
return this._API.doGet(UrlEndpoints.GET_UserById + id)
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
}


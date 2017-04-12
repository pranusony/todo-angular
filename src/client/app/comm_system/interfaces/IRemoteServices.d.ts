

declare interface IRemoteService
{
    source:string;
}
declare interface IJavaPracticeService extends IRemoteService
{
    fillPracticeLabTestCategories(prac_pr_seq_no: number):Promise<any>;

}

declare interface ICFPreferenceService extends IRemoteService
{
    fill(args: {param:number}):Promise<any>;

}

declare interface IJavaScheduleService extends IRemoteService
{
     fillCenters(parent_pr_seq_no:number, of_party_seq_no:number, dayOfWeek:number, shiftList:Array<any>,
                selectedMonth:Date):Promise<any>;
     fillDialysisCenters(practice_seq_no:number):Promise<any>;

}

declare interface IJavaMessageCenterService extends IRemoteService
{
    getMessageSummaryDataByCategory(userID:number, userRoles:string, practiceID:number, officeID:number, physID:number, patPartySeqNo:number, onlyUnread:string, seeFuture:boolean, isTrue:boolean, empty1:string, empty2:string, futureDate:string):Promise<any>;
}

declare interface IJavaDialysisScheduleService extends IRemoteService
{
    getEChartingTemplatePreference(party_seq_no:number):Promise<any>;
}

declare interface IJavaRemoteServices
{
    practiceService:IJavaPracticeService;
    scheduleService:IJavaScheduleService;
    messageCenterService:IJavaMessageCenterService;
    dialysisScheduleService:IJavaDialysisScheduleService;

}

declare interface ICFRemoteServices
{
    preferenceService:ICFPreferenceService
}
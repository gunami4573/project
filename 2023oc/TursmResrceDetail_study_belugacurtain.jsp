<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="hui" uri="http://www.hanshinit.co.kr/jstl/ui"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8"/>
    <meta name="decorator" content="${menuInfo.siteId}"/>
    <title>관광자원 상세보기</title>
    <link rel="stylesheet" href="./css/neo.css"/>
    <link rel="stylesheet" href="./css/subheader.css"/>
    <script src="/common/js/jquery-1.12.4.min.js"></script>
</head>
<body>
<c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,aditfield,eventPd,eventPlace,crltsSe,appnNo,qy,appnDe,appnSe,rprsntv,mainMenu,rumQy,reqreTime,mtnrngTy,pmntnCn',',')}"/>
<c:choose>
    <c:when test="${tnTursmResrce.se1 eq '관광지'}">
        <c:choose>
            <c:when test="${tnTursmResrce.se2 eq '산'}">
                <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,aditfield,reqreTime,mtnrngTy,pmntnCn',',')}"/>
            </c:when>
            <c:otherwise>
                <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,aditfield',',')}"/>
            </c:otherwise>
        </c:choose>
    </c:when>
    <c:when test="${tnTursmResrce.se1 eq '문화재'}">
        <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,crltsSe,appnNo,qy,appnDe',',')}"/>
    </c:when>
    <c:when test="${tnTursmResrce.se1 eq '축제체험'}">
        <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,aditfield,eventPd,eventPlace',',')}"/>
    </c:when>
    <c:when test="${tnTursmResrce.se1 eq '보호수'}">
        <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,appnNo,qy,appnDe',',')}"/>
    </c:when>
    <c:when test="${tnTursmResrce.se1 eq '음식'}">
        <c:choose>
            <c:when test="${tnTursmResrce.se2 eq '모범음식점'}">
                <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,aditfield,appnSe,rprsntv,mainMenu',',')}"/>
            </c:when>
            <c:otherwise>
                <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,aditfield,rprsntv,mainMenu',',')}"/>
            </c:otherwise>
        </c:choose>
    </c:when>
    <c:when test="${tnTursmResrce.se1 eq '숙박'}">
        <c:set var="arr" value="${fn:split('inqrytel,hmpg,detailCn,coord,transportInfo,useTime,useChrge,rstde,aditfield,rumQy',',')}"/>
    </c:when>
</c:choose>
<div class="oc_program tursm_u view cts_max">
    <div class="tour_view_top">
        <div class="top_inner">
            <div class="view_slide_wrap">
                <div class="view_slide_list">
                    <c:set var="imgList" value="${tnTursmResrce.atchmnflListMap['upload']}"/>
                    <c:choose>
                        <c:when test="${not empty imgList and fn:length(imgList) gt 0}">
                            <c:forEach var="f" items="${imgList}" varStatus="istt">
                                <div class="view_slide_item">
                                    <span class="img_wrap">
                                        <span class="view_img" style="background-image:url(/cmm/downloadCmmAtchmnfl.do?fileNo=${f.fileNo}&amp;fileId=${tsu:encodeURIComponent(f.fileId, 'utf8')});"></span>    <!--//view_img-->
                                        <img class="hidden_img" src="/cmm/downloadCmmAtchmnfl.do?fileNo=${f.fileNo}&amp;fileId=${tsu:encodeURIComponent(f.fileId, 'utf8')}" alt="${tnTursmResrce.nm} ${istt.count}번째 이미지"/>    <!--//hidden_img-->
                                    </span>    <!--//img_wrap-->
                                </div>    <!--//view_slide_item-->
                            </c:forEach>
                        </c:when>
                        <c:otherwise>
                            <div class="view_slide_item">
                                <span class="img_wrap">
                                    <span class="blackout">대표 이미지 없음</span>    <!--//blackout-->
                                </span>    <!--//img_wrap-->
                            </div>    <!--//view_slide_item-->
                        </c:otherwise>
                    </c:choose>
                </div>    <!--//view_slide_list-->
                <div class="view_slide_control">
                    <button type="button" class="control_btn prev">이전</button>    <!--//control_btn prev-->
                    <span class="count_box">
                        <em class="count_text current"></em>    <!--//count_text current-->
                        <em class="count_text dash">/</em>    <!--//count_text dash-->
                        <em class="count_text total"></em>    <!--//count_text total-->
                    </span>    <!--//count_box-->
                    <button type="button" class="control_btn next">다음</button>    <!--//control_btn next-->
                </div>    <!--//view_slide_control-->
            </div>    <!--//view_slide_wrap-->
            <div class="view_text_wrap">
                <h3>${tnTursmResrce.nm}</h3>
                <c:set var="url">http://map.naver.com/?menu=route&mapMode=0&lng=${tnTursmResrce.lo}&lat=${tnTursmResrce.la}&dlevel=8&pathType=0&dtPathType=2&enc=b64&elng=${tnTursmResrce.lo}&elat=${tnTursmResrce.la}&eText=${tsu:urlEncodeByEnc(tsu:b64Encode(tnTursmResrce.nm), "utf-8")}</c:set>
                <span class="oc_btn green_type road">
                    <a href="${url}" target="_blank" title="새창" rel="noopener noreferrer" class="btn">길찾기</a>
                </span>    <!--//oc_btn road-->
                <ul class="view_text_list">
                    <c:if test="${not empty tnTursmResrce.adres}">
                        <li class="view_text_item type01">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.adres.name" text="adres"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.adres}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.useTime}">
                        <li class="view_text_item type02">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.useTime.name" text="useTime"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.useTime}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.inqrytel}">
                        <li class="view_text_item type03">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.inqrytel.name" text="inqrytel"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.inqrytel}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.hmpg}">
                        <li class="view_text_item type04">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.hmpg.name" text="hmpg"/></span>
                                <span class="inner_text"><i></i><i></i><a href="${tnTursmResrce.hmpg}" target="_blank" title="새창" rel="noopener noreferrer">${tnTursmResrce.hmpg}</a></span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.useChrge}">
                        <li class="view_text_item type05">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.useChrge.name" text="useChrge"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.useChrge}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.rstde}">
                        <li class="view_text_item type06">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.rstde.name" text="rstde"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.rstde}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.reqreTime}">
                        <li class="view_text_item type07">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.reqreTime.name" text="reqreTime"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.reqreTime}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.mtnrngTy}">
                        <li class="view_text_item type08">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.mtnrngTy.name" text="mtnrngTy"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.mtnrngTy}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.pmntnCn}">
                        <li class="view_text_item type09">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.pmntnCn.name" text="pmntnCn"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.pmntnCn}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.appnNo}">
                        <li class="view_text_item type10">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.appnNo.name" text="appnNo"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.appnNo}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.qy}">
                        <li class="view_text_item type11">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.qy.name" text="qy"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.qy}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                    <c:if test="${not empty tnTursmResrce.appnDe}">
                        <li class="view_text_item type12">
                            <div class="text_item_inner">
                                <span class="inner_title"><i></i><i></i><spring:message code="tnTursmResrce.appnDe.name" text="appnDe"/></span>
                                <span class="inner_text"><i></i><i></i>${tnTursmResrce.appnDe}</span>
                            </div>    <!--//text_item_inner-->
                        </li>    <!--//view_text_item-->
                    </c:if>
                </ul>    <!--//view_text_list-->
            </div>    <!--//view_text_wrap-->
        </div>    <!--//top_inner-->
    </div>    <!--//tour_view_top-->
    <c:set var="imgList" value="${tnTursmResrce.atchmnflListMap['mountain']}"/>
    <c:if test="${fn:length(imgList) > 0}">
        <h4>등산로코스</h4>
        <div class="oc_img_box list_type" data-row="2">
            <div class="img_list">
                <c:forEach var="f" items="${imgList}" varStatus="iimg">
                    <div class="img_item">
                        <div class="img_box">
                            <img src="/cmm/downloadCmmAtchmnfl.do?fileNo=${f.fileNo}&amp;fileId=${tsu:encodeURIComponent(f.fileId, 'utf8')}" alt="<c:out value=" ${tnTursmResrce.nm}"/> 등산로 ${iimg.count}번째 이미지" class="real_img" />    <!--//real_img-->
                            <span class="img_zoom">
                                <a href="/cmm/downloadCmmAtchmnfl.do?fileNo=${f.fileNo}&amp;fileId=${tsu:encodeURIComponent(f.fileId, 'utf8')}" target="_blank" title="새창 이미지 확대보기">이미지 확대보기</a>
                            </span>    <!--//img_zoom-->
                        </div>    <!--//img_box-->
                    </div>    <!--//img_item-->
                </c:forEach>
            </div>    <!--//img_list-->
        </div>    <!--//oc_img_box list_type-->
    </c:if>
    <c:if test="${not empty tnTursmResrce['detailCn']}">
        <h4>
            <spring:message code="tnTursmResrce.detailCn.name" text="detailCn"/>
        </h4>
        <div class="detail_box">
            ${tsu:nl2br(tnTursmResrce['detailCn'])}
        </div>    <!--//detail_box-->
    </c:if>
    <c:set var="photoList" value="${tnTursmResrce.atchmnflListMap['photo']}"/>
    <c:if test="${(not empty photoList and fn:length(photoList) gt 0)}">
        <h4>${tnTursmResrce.nm} 이미지 목록</h4>
        <div class="oc_img_box list_type" data-row="2">
            <div class="img_list">
                <c:forEach var="f" items="${photoList}" varStatus="fstt">
                    <div class="img_item">
                        <div class="img_box">
                            <img src="/cmm/downloadCmmAtchmnfl.do?fileNo=${f.fileNo}&amp;fileId=${tsu:encodeURIComponent(f.fileId, 'utf8')}" alt="${tnTursmResrce.nm} ${fstt.count}번째 이미지" class="real_img"/>    <!--//real_img-->
                            <span class="img_zoom">
                                <a href="/cmm/downloadCmmAtchmnfl.do?fileNo=${f.fileNo}&amp;fileId=${tsu:encodeURIComponent(f.fileId, 'utf8')}" target="_blank" title="새창 이미지 확대보기">이미지 확대보기</a>
                            </span>    <!--//img_zoom-->
                        </div>    <!--//img_box-->
                    </div>    <!--//img_item-->
                </c:forEach>
            </div>    <!--//img_list-->
        </div>    <!--//oc_img_box list_type-->
    </c:if>
    <c:if test="${not empty tnTursmResrce['coord']}">
        <h4>주변관광지</h4>    <!--//h4-->
        <div class="oc_tab type3">
            <div class="oc_tab_inner">
                <button type="button" title="하위 리스트 열기" class="m_oc_choice"><span><em></em></span>
                </button>    <!--//m_oc_choice-->
                <ul class="oc_tab_list">
                    <li class="oc_tab_item active">
                        <button type="button" title="선택됨" class="oc_tab_btn" onclick="return resizeMap(0)">
                            <span><em>전체</em></span></button>    <!--//oc_tab_btn-->
                    </li>    <!--//oc_tab_item-->
                    <li class="oc_tab_item">
                        <button type="button" class="oc_tab_btn" onclick="return resizeMap(1)"><span><em>관광지</em></span>
                        </button>    <!--//oc_tab_btn-->
                    </li>    <!--//oc_tab_item-->
                    <li class="oc_tab_item">
                        <button type="button" class="oc_tab_btn" onclick="return resizeMap(2)"><span><em>음식</em></span>
                        </button>    <!--//oc_tab_btn-->
                    </li>    <!--//oc_tab_item-->
                    <li class="oc_tab_item">
                        <button type="button" class="oc_tab_btn" onclick="return resizeMap(3)"><span><em>숙박</em></span>
                        </button>    <!--//oc_tab_btn-->
                    </li>    <!--//oc_tab_item-->
                </ul>    <!--//oc_tab_list-->
            </div>    <!--//oc_tab_inner-->
            <div class="oc_cts">
                <div class="oc_cts_item active">    <!--//전체-->
                    <div class="tab_map" id="dist_map_a"><!--전체 지도영역 --></div>    <!--//tab_map-->
                    <div class="map_desc_box">
                        <c:set var="dist_tour_cnt" value="0"/>
                        <c:set var="dist_food_cnt" value="0"/>
                        <c:set var="dist_lodge_cnt" value="0"/>
                        <c:if test="${not empty distList and fn:length(distList) gt 0}">
                            <ul class="map_desc_list" tabindex="0">
                                <c:forEach var="t" items="${distList}" varStatus="index">
                                    <c:choose>
                                        <c:when test="${t.se1 eq '관광지'}">
                                            <c:set var="cls" value="tour"/>
                                            <c:choose>
                                                <c:when test="${t.se2 eq '산'}">
                                                    <c:set var="mkey" value="2511"/>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:set var="mkey" value="2510"/>
                                                </c:otherwise>
                                            </c:choose>
                                            <c:set var="dist_tour_cnt" value="${dist_tour_cnt + 1}"/>
                                        </c:when>
                                        <c:when test="${t.se1 eq '음식'}">
                                            <c:set var="cls" value="food"/>
                                            <c:choose>
                                                <c:when test="${t.se2 eq '모범음식점'}">
                                                    <c:set var="mkey" value="2533"/>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:set var="mkey" value="2534"/>
                                                </c:otherwise>
                                            </c:choose>
                                            <c:set var="dist_food_cnt" value="${dist_food_cnt + 1}"/>
                                        </c:when>
                                        <c:when test="${t.se1 eq '숙박'}">
                                            <c:set var="cls" value="lodge"/>
                                            <c:choose>
                                                <c:when test="${t.se2 eq '민박'}">
                                                    <c:set var="mkey" value="2536"/>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:set var="mkey" value="2537"/>
                                                </c:otherwise>
                                            </c:choose>
                                            <c:set var="dist_lodge_cnt" value="${dist_lodge_cnt + 1}"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="cls" value=""/>
                                            <c:set var="mkey" value="2510"/>
                                        </c:otherwise>
                                    </c:choose>
                                    <li class="map_desc_item">
                                        <div class="img_wrap">
                                            <span class="view_img" style="background-image:url(/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y);"></span>    <!--//view_img-->
                                            <img class="hidden_img" src="/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y" alt="${t.nm} 이미지"/>    <!--//hidden_img-->
                                        </div>    <!--//img_wrap-->
                                        <div class="desc_wrap">
                                            <span class="desc_title">
                                                <span class="map_num"><c:out value="${index.index + 1}"/></span>
                                                <em><c:out value="${t.nm}"/></em>
                                            </span>    <!--//desc_title-->
                                            <p class="desc_text">
                                                <c:choose>
                                                    <c:when test="${t.se1 eq '숙박'}">
                                                        <span class="text type01"><c:out value="${t.inqrytel}"/></span>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <span class="text type02"><c:out value="${t.adres}"/></span>
                                                    </c:otherwise>
                                                </c:choose>
                                            </p>    <!--//desc_text-->
                                            <div class="desc_link">
                                                <c:if test="${not empty t.coord}">
                                                    <span class="oc_btn hover">
                                                        <a href="#n" class="btn first_btn" data-latlng="${t.coord}" onclick="moveMapPosition(0, ${t.coord})">위치보기</a>
                                                    </span>    <!--//oc_btn hover-->
                                                </c:if>
                                                <c:if test="${t.se1 ne '숙박'}">
                                                    <span class="oc_btn">
                                                        <a href="viewTnTursmResrceU.do?key=${mkey}&amp;resrceNo=${t.resrceNo}&amp;sa1=<c:out value=" ${tsu:encodeURIComponent(t.se1, 'utf-8')}"/>&amp;sa2=<c:out value="${tsu:encodeURIComponent(t.se2, 'utf-8')}"/>" class="btn">
                                                            자세히보기
                                                        </a>
                                                    </span>    <!--//oc_btn-->
                                                </c:if>
                                            </div>    <!--//desc_link-->
                                        </div>    <!--//desc_wrap-->
                                    </li>    <!--//map_desc_item-->
                                </c:forEach>
                            </ul>    <!--//map_desc_list-->
                        </c:if>
                    </div>    <!--//map_desc_box-->
                </div>    <!--//oc_cts_item-->
                <div class="oc_cts_item">    <!--//관광지-->
                    <div class="tab_map" id="dist_map_1"><!--관광지 지도영역 --></div>    <!--//tab_map-->
                    <div class="map_desc_box">
                        <c:if test="${dist_tour_cnt gt 0}">
                            <ul class="map_desc_list" tabindex="0">
                                <c:forEach var="t" items="${distList}" varStatus="index">
                                    <c:if test="${t.se1 eq '관광지'}">
                                        <c:choose>
                                            <c:when test="${t.se2 eq '산'}">
                                                <c:set var="mkey" value="2511"/>
                                            </c:when>
                                            <c:otherwise>
                                                <c:set var="mkey" value="2510"/>
                                            </c:otherwise>
                                        </c:choose>
                                        <li class="map_desc_item">
                                            <div class="img_wrap">
                                                <span class="view_img" style="background-image:url(/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y);"></span>    <!--//view_img-->
                                                <img class="hidden_img" src="/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y" alt="${t.nm} 이미지"/>    <!--//hidden_img-->
                                            </div>    <!--//img_wrap-->
                                            <div class="desc_wrap">
                                                <span class="desc_title">
                                                    <span class="map_num"><c:out value="${index.index + 1}"/></span>
                                                    <em><c:out value="${t.nm}"/></em>
                                                </span>    <!--//desc_title-->
                                                <p class="desc_text">
                                                    <span class="text type02"><c:out value="${t.adres}"/></span>
                                                </p>    <!--//desc_text-->
                                                <div class="desc_link">
                                                    <c:if test="${not empty t.coord}">
                                                        <span class="oc_btn hover">
                                                            <a href="#n" class="btn first_btn" data-latlng="${t.coord}" onclick="moveMapPosition(1, ${t.coord})">위치보기</a>
                                                        </span>    <!--//oc_btn hover-->
                                                    </c:if>
                                                    <span class="oc_btn">
                                                        <a href="viewTnTursmResrceU.do?key=${mkey}&amp;resrceNo=${t.resrceNo}&amp;sa1=<c:out value=" ${tsu:encodeURIComponent(t.se1, 'utf-8')}"/>&amp;sa2=<c:out value="${tsu:encodeURIComponent(t.se2, 'utf-8')}"/>" class="btn">자세히보기</a>
                                                    </span>    <!--//oc_btn-->
                                                </div>    <!--//desc_link-->
                                            </div>    <!--//desc_wrap-->
                                        </li>    <!--//map_desc_item-->
                                    </c:if>
                                </c:forEach>
                            </ul>    <!--//map_desc_list-->
                        </c:if>
                    </div>    <!--//map_desc_box-->
                </div>    <!--//oc_cts_item-->
                <div class="oc_cts_item">    <!--//음식-->
                    <div class="tab_map" id="dist_map_2"><!--음식 지도영역 --></div>    <!--//tab_map-->
                    <div class="map_desc_box">
                        <c:if test="${dist_food_cnt gt 0}">
                            <ul class="map_desc_list" tabindex="0">
                                <c:forEach var="t" items="${distList}" varStatus="index">
                                    <c:if test="${t.se1 eq '음식'}">
                                        <c:choose>
                                            <c:when test="${t.se2 eq '모범음식점'}">
                                                <c:set var="mkey" value="2533"/>
                                            </c:when>
                                            <c:otherwise>
                                                <c:set var="mkey" value="2534"/>
                                            </c:otherwise>
                                        </c:choose>
                                        <li class="map_desc_item">
                                            <div class="img_wrap">
                                                <span class="view_img" style="background-image:url(/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y);"></span>    <!--//view_img-->
                                                <img class="hidden_img" src="/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y" alt="${t.nm} 이미지"/>    <!--//hidden_img-->
                                            </div>    <!--//img_wrap-->
                                            <div class="desc_wrap">
                                                <span class="desc_title">
                                                    <span class="map_num"><c:out value="${index.index + 1}"/></span>
                                                    <em><c:out value="${t.nm}"/></em>
                                                </span>    <!--//desc_title-->
                                                <p class="desc_text">
                                                    <span class="text type02"><c:out value="${t.adres}"/></span>
                                                </p>    <!--//desc_text-->
                                                <div class="desc_link">
                                                    <c:if test="${not empty t.coord}">
                                                        <span class="oc_btn hover">
                                                            <a href="#n" class="btn first_btn" data-latlng="${t.coord}" onclick="moveMapPosition(2, ${t.coord})">위치보기</a>
                                                        </span>    <!--//oc_btn hover-->
                                                    </c:if>
                                                    <%--
                                                    <span class="oc_btn">
                                                        <a href="viewTnTursmResrceU.do?key=${mkey}&amp;resrceNo=${t.resrceNo}&amp;sa1=<c:out value=" ${tsu:encodeURIComponent(t.se1, 'utf-8')}"/>&amp;sa2=<c:out value="${tsu:encodeURIComponent(t.se2, 'utf-8')}"/>" class="btn">자세히보기</a>
                                                    </span>    <!--//oc_btn-->
                                                    --%>
                                                </div>    <!--//desc_link-->
                                            </div>    <!--//desc_wrap-->
                                        </li>    <!--//map_desc_item-->
                                    </c:if>
                                </c:forEach>
                            </ul>    <!--//map_desc_list-->
                        </c:if>
                    </div>    <!--//map_desc_box-->
                </div>    <!--//oc_cts_item-->
                <div class="oc_cts_item">    <!--//숙박-->
                    <div class="tab_map" id="dist_map_3"><!--숙박 지도영역 --></div>    <!--//tab_map-->
                    <div class="map_desc_box">
                        <c:if test="${dist_lodge_cnt gt 0}">
                            <ul class="map_desc_list" tabindex="0">
                                <c:forEach var="t" items="${distList}" varStatus="index">
                                    <c:if test="${t.se1 eq '숙박'}">
                                        <c:choose>
                                            <c:when test="${t.se2 eq '민박'}">
                                                <c:set var="mkey" value="2536"/>
                                            </c:when>
                                            <c:otherwise>
                                                <c:set var="mkey" value="2537"/>
                                            </c:otherwise>
                                        </c:choose>
                                        <li class="map_desc_item">
                                            <div class="img_wrap">
                                                <span class="view_img" style="background-image:url(/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y);"></span>    <!--//view_img-->
                                                <img class="hidden_img" src="/cmm/downloadCmmAtchmnflByParam.do?cmmAtchmnflId=${tsu:encodeURIComponent(t.cmmAtchmnflId, 'utf8')}&amp;tblNm=${t.tblNm4File}&amp;seq=${t.pk4File}&amp;seqCtgry=upload&amp;seqIdx=1&amp;atchType=img&amp;isThumb=Y" alt="${t.nm} 이미지"/>    <!--//hidden_img-->
                                            </div>    <!--//img_wrap-->
                                            <div class="desc_wrap">
                                                <span class="desc_title">
                                                    <span class="map_num"><c:out value="${index.index + 1}"/></span>
                                                    <em><c:out value="${t.nm}"/></em>
                                                </span>    <!--//desc_title-->
                                                <p class="desc_text">
                                                    <span class="text type01"><c:out value="${t.inqrytel}"/></span>
                                                </p>    <!--//desc_text-->
                                                <div class="desc_link">
                                                    <c:if test="${not empty t.coord}">
                                                        <span class="oc_btn hover">
                                                            <a href="#n" class="btn first_btn" data-latlng="${t.coord}" onclick="moveMapPosition(3, ${t.coord})">위치보기</a>
                                                        </span>    <!--//oc_btn hover-->
                                                    </c:if>
                                                    <%--
                                                    <span class="oc_btn">
                                                        <a href="viewTnTursmResrceU.do?key=${mkey}&amp;resrceNo=${t.resrceNo}&amp;sa1=<c:out value=" ${tsu:encodeURIComponent(t.se1, 'utf-8')}"/>&amp;sa2=<c:out value="${tsu:encodeURIComponent(t.se2, 'utf-8')}"/>" class="btn">자세히보기</a>
                                                    </span>    <!--//oc_btn-->
                                                    --%>
                                                </div>    <!--//desc_link-->
                                            </div>    <!--//desc_wrap-->
                                        </li>    <!--//map_desc_item-->
                                    </c:if>
                                </c:forEach>
                            </ul>    <!--//map_desc_list-->
                        </c:if>
                    </div>    <!--//map_desc_box-->
                </div>    <!--//oc_cts_item-->
            </div>    <!--//oc_cts-->
        </div>    <!--//oc_tab type3-->
    </c:if>
    <c:if test="${not empty tnTursmResrce['transportInfo']}">
        <!--//교통정보-->
        <h4>
            <spring:message code="tnTursmResrce.transportInfo.name" text="transportInfo"/>
        </h4>
        <div class="trans_box">
            <div class="indent">
                ${tsu:nl2br(tnTursmResrce['transportInfo'])}
            </div>    <!--//indent-->
        </div>    <!--//trans_box-->
    </c:if>
    <c:if test="${not empty blogList and fn:length(blogList) gt 0}">
        <h4>여행후기</h4>
        <div class="oc_review_box">
            <ul class="review_list">
                <c:set var="currentPageStartNo" value="${blogPaginationInfo.currentPageStartNo}"/>
                <c:forEach var="r" items="${blogList}" end="4">
                    <c:if test="${currentPageStartNo gt 0}">
                        <li class="review_item">
                            <a href="${r.link}" target="_blank" title="새창" class="review_link">
                                <span class="link_inner">
                                    <span class="naver_text">
                                        <%--
                                        <img src="/common/images/program/resource_blog_logo.png" alt="blog"/>
                                        --%>
                                        네이버블로그
                                    </span>    <!--//naver_text-->
                                    <span class="review_text">
                                        ${r.title}
                                    </span>    <!--//review_text-->
                                    <span class="quick_text">바로가기</span>    <!--//quick_text-->
                                </span>    <!--//link_inner-->
                            </a>    <!--//review_link-->
                        </li>    <!--//review_item-->
                        <c:set var="currentPageStartNo" value="${currentPageStartNo-1}"/>
                    </c:if>
                </c:forEach>
            </ul>    <!--//review_list-->
        </div>    <!--//oc_review_box-->
    </c:if>
    <div class="btn_align_box">
        <span class="oc_btn">
            <a href="./selectTnTursmResrceListU.do?${scrit.h_qskp}" class="btn">목록</a>
        </span>    <!--//oc_btn-->
    </div>    <!--//btn_align_box-->
</div>    <!--//oc_program tursm_u view-->
<c:if test="${not empty tnTursmResrce['coord']}">
    <c:set var="DAUM_API_KEY"><%=kr.co.hanshinit.NeoCMS.cmm.util.PropResource.getString("daum.map.app.key")%></c:set>
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${DAUM_API_KEY}"></script>
    <script>
        //<![CDATA[
        var aroundMapContainer = [
                document.getElementById('dist_map_a'),
                document.getElementById('dist_map_1'),
                document.getElementById('dist_map_2'),
                document.getElementById('dist_map_3')
            ],
            aroundMapOption = {
                center: new daum.maps.LatLng(${tnTursmResrce['coord']}), // 지도의 중심좌표 (${tnTursmResrce.nm})
                level: 5 // 지도의 확대 레벨
            };
        var aroundMap = [
            new daum.maps.Map(aroundMapContainer[0], aroundMapOption),
            new daum.maps.Map(aroundMapContainer[1], aroundMapOption),
            new daum.maps.Map(aroundMapContainer[2], aroundMapOption),
            new daum.maps.Map(aroundMapContainer[3], aroundMapOption)
        ];
        for (i = 0; i < aroundMap.length; i++) {
            var aroundMapTypeControl = new daum.maps.MapTypeControl();
            var aroundMapZoomControl = new daum.maps.ZoomControl();
            aroundMap[i].addControl(aroundMapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
            aroundMap[i].addControl(aroundMapZoomControl, daum.maps.ControlPosition.RIGHT);
        }
        // 마커를 표시할 위치와 title 객체 배열입니다
        var positions = [];
        positions[0] = [{
            viewUrl: "",
            title: "${tnTursmResrce.nm}",
            latlng: new daum.maps.LatLng(${tnTursmResrce['coord']}),
            kind: "${tnTursmResrce['se1']}"
        }
            <c:if test="${not empty distList and fn:length(distList) gt 0}">
                <c:forEach var="t" items="${distList}" varStatus="tstt">
                    <c:if test="${not empty t.coord}">,
                        {
                            viewUrl : "",
                            title : "${t.nm}",
                            latlng : new daum.maps.LatLng(${t.coord}),
                            kind : "${t.se1}"
                        }
                    </c:if>
                </c:forEach>
            </c:if>
        ];
        positions[1] = [
            {
                viewUrl: "",
                title: "${tnTursmResrce.nm}",
                latlng: new daum.maps.LatLng(${tnTursmResrce['coord']}),
                kind: "${tnTursmResrce['se1']}"
            }
            <c:if test="${not empty distList and fn:length(distList) gt 0}">
                <c:set var="pidx" value="1"/>
                <c:forEach var="t" items="${distList}" varStatus="tstt">
                    <c:if test="${t.se1 eq '관광지' and not empty t.coord}">,
                        {
                            viewUrl : "",
                            title : "${t.nm}",
                            latlng : new daum.maps.LatLng(${t.coord}),
                            kind : "${t.se1}"
                        }
                        <c:set var="pidx" value="${pidx+1}"/>
                    </c:if>
                </c:forEach>
            </c:if>
        ];
        positions[2] = [
            {
                viewUrl: "",
                title: "${tnTursmResrce.nm}",
                latlng: new daum.maps.LatLng(${tnTursmResrce['coord']}),
                kind: "${tnTursmResrce['se1']}"
            }
            <c:if test="${not empty distList and fn:length(distList) gt 0}">
                <c:set var="pidx" value="1"/>
                <c:forEach var="t" items="${distList}" varStatus="tstt">
                    <c:if test="${t.se1 eq '음식' and not empty t.coord}">,
                        {
                            viewUrl : "",
                            title : "${t.nm}",
                            latlng: new daum.maps.LatLng(${t.coord}),
                            kind: "${t.se1}"
                        }
                        <c:set var="pidx" value="${pidx+1}"/>
                    </c:if>
                </c:forEach>
            </c:if>
        ];
        positions[3] = [
            {
                viewUrl: "",
                title: "${tnTursmResrce.nm}",
                latlng: new daum.maps.LatLng(${tnTursmResrce['coord']}),
                kind: "${tnTursmResrce['se1']}"
            }
            <c:if test="${not empty distList and fn:length(distList) gt 0}">
                <c:set var="pidx" value="1"/>
                <c:forEach var="t" items="${distList}" varStatus="tstt">
                    <c:if test="${t.se1 eq '숙박' and not empty t.coord}">,
                        {
                            viewUrl : "",
                            title : "${t.nm}",
                            latlng: new daum.maps.LatLng(${t.coord}),
                            kind: "${t.se1}"
                        }
                        <c:set var="pidx" value="${pidx+1}"/>
                    </c:if>
                </c:forEach>
            </c:if>
        ];
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = ["/common/images/program/resource_map_pin.png", "/common/images/program/resource_map_pin2.png", "/common/images/program/resource_map_pin3.png"];
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new daum.maps.Size(22, 26);
        // 마커 이미지를 생성합니다
        var markerImage = [
            new daum.maps.MarkerImage(imageSrc[0], imageSize),
            new daum.maps.MarkerImage(imageSrc[1], imageSize),
            new daum.maps.MarkerImage(imageSrc[2], imageSize)
        ];
        var marker = [];
        $(document).ready(function () {
            makeMarker(0);
            makeMarker(1);
            makeMarker(2);
            makeMarker(3);
        });

        function panTo(m, latitude, longitude) {
            var moveLatLon = new daum.maps.LatLng(latitude, longitude);
            aroundMap[m].panTo(moveLatLon);
        }

        function moveMapPosition(m, lat, lng) {
            panTo(m, lat, lng);
            console.log($(this).text());
        }

        function makeMarker(m) {
            marker[m] = [];
            for (var i = 0; i < positions[m].length; i++) {
                if (positions[m][i].latlng) {
                    var markerIdx = 0;
                    if (positions[m][i].kind == '음식') {
                        markerIdx = 1;
                    } else if (positions[m][i].kind == '숙박') {
                        markerIdx = 2;
                    }

                    // 마커를 생성합니다
                    marker[m][i] = new daum.maps.Marker({
                        map: aroundMap[m], // 마커를 표시할 지도
                        position: positions[m][i].latlng, // 마커를 표시할 위치
                        title: positions[m][i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                        image: markerImage[markerIdx], // 마커 이미지
                    });

                    //area 타이틀 제거
                    //marker[m][i].$b.removeAttribute('title');
                }
            }
            aroundMap[m].relayout();
        }

        var customOverlay;

        function CreateOverlay(m, latitude, longitude, thisTitle) {
            var OverlayLatLon = new kakao.maps.LatLng(latitude, longitude);
            var iwcontent = '<div class="customoverlay">' +
                '<div class="title">' + thisTitle + '</div>' +
                '<button type="button" onclick="closeOverlay();" class="close_overlay">닫기</button>' +
                '</div>';

            // 커스텀 오버레이가 있을 때
            if (customOverlay) {
                customOverlay.setMap(null);
            }

            // 커스텀 오버레이를 생성합니다
            customOverlay = new kakao.maps.CustomOverlay({
                map: aroundMap[m],
                position: new kakao.maps.LatLng(latitude, longitude),
                content: iwcontent,
                yAnchor: 1
            });
        }

        function closeOverlay() {
            customOverlay.setMap(null);
        }

        function resizeMap(m) {
            setTimeout(function () {
                makeMarker(m);
                return false;
            }, 1);
        }

        //]]>
    </script>
    <script>
        $(document).on('click', '.first_btn', function (e) {
            var $this = $(this),
                $MyOcBtn = $this.parent('.oc_btn'),
                $MyDescLink = $MyOcBtn.parent('.desc_link'),
                $MyDescWrap = $MyDescLink.parent('.desc_wrap'),
                $MyDescTitle = $MyDescWrap.find('.desc_title em').text(),
                $MyDescItem = $MyDescWrap.parent('.map_desc_item'),
                $MyDescList = $MyDescItem.parent('.map_desc_list'),
                $MyDescBox = $MyDescList.parent('.map_desc_box'),
                $MyOcCtsItem = $MyDescBox.parent('.oc_cts_item'),
                MyOcCtsItemIndex = $MyOcCtsItem.index(),
                IsActive = $MyDescItem.is('.active'),
                $OtherDescItem = $MyDescItem.siblings('.map_desc_item'),
                $OtherFirstBtn = $OtherDescItem.find('.first_btn');
            var LatLng = $this.attr('data-latlng'),
                Lat = LatLng.split(',')[0],
                Lng = LatLng.split(',')[1];
            if (!IsActive) {
                $OtherDescItem.removeClass('active');
                $OtherFirstBtn.removeAttr('title');
                $MyDescItem.addClass('active');
                $this.attr('title', '선택됨');

            }
            CreateOverlay(MyOcCtsItemIndex, Lat, Lng, $MyDescTitle);
            e.preventDefault();
        });
        $(function () {
            var $OcCtsItemFirst = $('.oc_cts .oc_cts_item:first-child'),
                $FirstMapDescBox = $OcCtsItemFirst.find('.map_desc_box'),
                $FirstMapDescList = $FirstMapDescBox.find('.map_desc_list'),
                $FirstMapDescItem = $FirstMapDescList.find('.map_desc_item:first-child'),
                $FirstDescWrap = $FirstMapDescItem.find('.desc_wrap'),
                $FirstDescLink = $FirstDescWrap.find('.desc_link'),
                $FirstBtn = $FirstDescLink.find('.first_btn');
            setTimeout(function () {
                $FirstBtn.click();
            }, 1);
            $('.oc_tab .oc_tab_inner .oc_tab_list .oc_tab_item button.oc_tab_btn').on('click', function () {
                var $this = $(this),
                    $MyItem = $this.parent('.oc_tab_item'),
                    MyItemIndex = $MyItem.index(),
                    $IndexOcCtsItem = $('.oc_tab .oc_cts .oc_cts_item').eq(MyItemIndex),
                    $IndexMapDescBox = $IndexOcCtsItem.find('.map_desc_box'),
                    $IndexMapDescList = $IndexMapDescBox.find('.map_desc_list'),
                    $IndexMapDescItem = $IndexMapDescList.find('.map_desc_item:first-child'),
                    $IndexDescWrap = $IndexMapDescItem.find('.desc_wrap'),
                    $IndexDescLink = $IndexDescWrap.find('.desc_link'),
                    $IndexBtn = $IndexDescLink.find('.first_btn');
                setTimeout(function () {
                    $IndexBtn.click();
                }, 1);

            });


            var $ViewSlideWrap = $('.tour_view_top .top_inner .view_slide_wrap'),
                $ViewSlideList = $ViewSlideWrap.find('.view_slide_list'),
                $ViewSlidePrev = $ViewSlideWrap.find('.prev'),
                $ViewSlideNext = $ViewSlideWrap.find('.next'),
                $ViewSlideCurrent = $ViewSlideWrap.find('.current'),
                $ViewSlideTotal = $ViewSlideWrap.find('.total');
            $ViewSlideList.slick({
                //기본
                autoplay: false,
                dots: false,
                draggable: true,
                swipe: true,
                swipeToSlide: true,
                fade: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                prevArrow: $ViewSlidePrev,
                nextArrow: $ViewSlideNext,
                total: $ViewSlideTotal,
                current: $ViewSlideCurrent,
                isRunOnLowIE: true,
                pauseOnHover: true,
                pauseOnSwipe: true,
                pauseOnArrowClick: true,
                variableWidth: false,
                zIndex: 0,
                responsive: [{}]
            });
        });
    </script>
</c:if>
</body>
</html>

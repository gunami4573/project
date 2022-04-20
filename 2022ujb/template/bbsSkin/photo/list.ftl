<#ftl encoding="utf-8"/>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="decorator" content="@@{menuInfo.siteId}" />
	<title>@@{menuInfo.cntntsNm} 목록</title>

	<link rel="stylesheet" type="text/css" href="/common/css/default.css" />
	<link rel="stylesheet" type="text/css" href="/common/css/program.css" />
	<script src="/common/js/jquery-1.12.4.HS-20200709.min.js"></script>

</head>
<body>

<div class="p-wrap bbs bbs__gallery">

<#if bbsInfo.clsdrUseAt = 'Y' && bbsInfo.listShowSe = 'LSSE02'>
	<#if bbsDescription.clsdrDcReplcAt = 'N'>
		${bbsDescription.clsdrDc!""}
	<#else>
<c:if test="@@{isExistCntntsFile}">
	<c:set var="contentsFile" value="/repository/@@{menuInfo.siteId}/contents/@@{key}.html"/>
	<c:import var="Content" url="@@{contentsFile}" charEncoding="UTF-8" />
	<c:out value="@@{Content}" escapeXml="false" />
</c:if>
	</#if>
<#else>
	<#if bbsDescription.listUpendDcReplcAt = 'N'>
		${bbsDescription.listUpendDc!""}
	<#else>
<c:if test="@@{isExistCntntsFile}">
	<c:set var="contentsFile" value="/repository/@@{menuInfo.siteId}/contents/@@{key}.html"/>
	<c:import var="Content" url="@@{contentsFile}" charEncoding="UTF-8" />
	<c:out value="@@{Content}" escapeXml="false" />
</c:if>
	</#if>
</#if>

<#if bbsInfo.listShowSe != 'LSSE02'>

	<#if bbsInfo.ctgryUseAt = 'Y' && bbsInfo.ctgryTy = 'CTGY02' && bbsCategoryList?size gt 0>
	<div class="p-nav p-nav--group">
		<ul class="p-nav__list">
		<#list bbsCategoryList as bbsCategory>
			<c:url var="categoryUrl" value="./selectBbsNttList.do">
				<c:param name="key" value="@@{key}"/>
				<c:param name="bbsNo" value="@@{bbsNo}"/>
				<c:param name="searchCtgry" value="${bbsCategory.ctgryNm}"/>
				<c:param name="integrDeptCode" value="@@{bbsNttVO.integrDeptCode}"/>
			</c:url>
			<li><a href="<c:out value="@@{categoryUrl}"/>" class="p-nav__link <c:if test="@@{bbsNttVO.searchCtgry eq '${bbsCategory.ctgryNm}'}">active</c:if>">${bbsCategory.ctgryNm}</a></li>
		</#list>
		</ul>
	</div>
	</#if>

	<form name="bbsNttSearchForm" action="./selectBbsNttList.do" method="get" class="boardSearchForm">
		<fieldset>
			<legend>게시물 검색</legend>
			<input type="hidden" name="key" id="key" value="<c:out value="@@{key}"/>"/>
			<input type="hidden" name="bbsNo" id="bbsNo" value="<c:out value="@@{bbsNo}"/>"/>
			<input type="hidden" name="searchCtgry" id="integrDeptCode" value="<c:out value="@@{bbsNttVO.searchCtgry}"/>"/>
			<input type="hidden" name="integrDeptCode" id="integrDeptCode" value="<c:out value="@@{bbsNttVO.integrDeptCode}"/>"/>
			<div class="card card--bgcolor p-search">
				<div class="p-form-group">
					<select name="searchCnd" id="searchCnd" class="p-input" title="검색항목선택">
					<#list bbsFieldSearchList as bbsFieldSearch>
						<option value="${bbsFieldSearch.fieldCode}" <c:if test="@@{bbsNttVO.searchCnd eq '${bbsFieldSearch.fieldCode}'}">selected="selected"</c:if>>${bbsFieldSearch.fieldUseNm}</option>
					</#list>
					</select>
					<span class="p-form__split"></span>
					<input type="text" name="searchKrwd" id="searchKrwd" class="p-input p-input--beside" title="검색단어 입력" value="<c:out value="@@{bbsNttVO.searchKrwd}"/>" placeholder="검색단어 입력">
					<span class="p-form-group__button">
						<button type="submit" class="p-button black">검색</button>
					</span>
				</div>
			</div>
		</fieldset>
	</form>

	<div class="row">
		<div class="col-12 col-sm-24 margin_t_10 small">
			총 <em class="em_black" data-mask="#,##0" data-mask-reverse="true"><fmt:formatNumber value="@@{tsu:xssNumberFilter(paginationInfo.totalRecordCount)}" pattern="#,###"/></em>건  &nbsp;[ <em class="em_b_black"><fmt:formatNumber value="@@{tsu:xssNumberFilter(paginationInfo.currentPageNo)}" pattern="#,###"/></em> / <fmt:formatNumber value="@@{tsu:xssNumberFilter(paginationInfo.totalPageCount)}" pattern="#,###"/> 페이지 ]
		<#if bbsInfo.rssUseAt = 'Y'>
			<c:url var="rssUrl" value="/rssBbsNtt.do">
				<c:param name="bbsNo" value="@@{bbsNo}"/>
				<c:param name="searchCtgry" value="@@{bbsNttVO.searchCtgry}"/>
				<c:param name="integrDeptCode" value="@@{bbsNttVO.integrDeptCode}"/>
			</c:url>
			<a href="<c:out value="@@{rssUrl}"/>" class="margin_l_5" target="_blank" title="새창">
			<svg width="16" height="26" fill="#f86400" focusable="false">
				<title>RSS보기</title>
				<use xlink:href="/common/images/program/p-icon.svg#rss"></use>
				<switch>
					<foreignObject width="20" height="20">RSS보기</foreignObject>
				</switch>
				</svg>
			</a>
		</#if>
		</div>
		<div class="col-12 col-sm-24 right">
		<#if bbsInfo.ctgryUseAt = 'Y' && bbsInfo.ctgryTy = 'CTGY01' && bbsCategoryList?size gt 0>
			<form name="bbsNttCategorySearchForm" method="get" action="./selectBbsNttList.do">
				<fieldset>
					<legend>${ctgryNm!""}</legend>
					<input type="hidden" name="key" value="<c:out value="@@{key}"/>"/>
					<input type="hidden" name="bbsNo" value="<c:out value="@@{bbsNo}"/>"/>
					<input type="hidden" name="integrDeptCode" value="<c:out value="@@{bbsNttVO.integrDeptCode}"/>"/>
					<input type="hidden" name="searchCnd" value="<c:out value="@@{bbsNttVO.searchCnd}"/>"/>
					<input type="hidden" name="searchKrwd" value="<c:out value="@@{bbsNttVO.searchKrwd}"/>"/>
					<select name="searchCtgry" id="searchCtgry" class="p-input p-input--auto" title="${ctgryNm!""} 선택">
						<option value="">${ctgryNm!""} 선택</option>
			<#list bbsCategoryList as bbsCategory>
						<option value="${bbsCategory.ctgryNm}" <c:if test="@@{bbsNttVO.searchCtgry eq '${bbsCategory.ctgryNm}'}">selected="selected"</c:if>>${bbsCategory.ctgryNm}</option>
			</#list>
					</select>
					<button type="submit" class="p-button p-button--small primary">확인</button>
				</fieldset>
			</form>
		</#if>
		</div>
	</div>
	
	<c:choose>
	<c:when test="@@{fn:length(bbsNttList) > 0}">
	
	<div class="p-media--gallery">
		<ul class="p-media-list p-media--cell3"><!-- .p-media--cell2 ~ cell6 1줄에 표시 갯수 적용 가능 -->
		<c:forEach var="result" items="@@{bbsNttList}" varStatus="status">
			<li class="p-media">
				<a href="./selectBbsNttView.do?key=<c:out value="@@{key}"/>&amp;bbsNo=<c:out value="@@{bbsNo}"/>&amp;nttNo=<c:out value="@@{result.nttNo}"/>&amp;searchCtgry=<c:out value="@@{bbsNttVO.searchCtgry}"/>&amp;searchCnd=<c:out value="@@{bbsNttVO.searchCnd}"/>&amp;searchKrwd=<c:out value="@@{bbsNttVO.searchKrwd}"/>&amp;pageIndex=<c:out value="@@{bbsNttVO.pageIndex}"/>&amp;integrDeptCode=<c:out value="@@{bbsNttVO.integrDeptCode}"/>" class="p-media__link">
                    <div class="p-media__image">
                        <c:if test="@@{empty result.storeFileNm}">
                        <div class="p-media__image-wrap no-image">
                            <em class="skip">이미지 없음</em>
                        </div>
                        </c:if>
                        <c:if test="@@{!empty result.storeFileNm}">
                        <div class="p-media__image-wrap">
                            <img src="<c:out value="@@{result.storePath}"/>/thumb/t_<c:out value="@@{result.storeFileNm}"/>" alt="<c:out value="@@{result.nttSj}"/> 이미지" />
                        </div>
                        </c:if>
                        <div class="p-icon-group">
                            <c:if test="@@{result.newIcon}"><span class="p-icon p-icon__new">새글</span></c:if>
                            <c:if test="@@{result.coolIcon}"><span class="p-icon p-icon__hot-bg">핫이슈</span></c:if>
                        </div>
                    </div>
					<div class="p-media__body">
						<div class="p-media__heading">
							<em class="p-media__heading-text">
								<c:if test="@@{result.deleteAt eq 'Y'}"><del></c:if>
								<#if bbsInfo.ctgryUseAt = 'Y' && bbsInfo.ctgryTy = 'CTGY03'>[<c:out value="@@{fn:replace(result.ctgryNm,'|','')}"/>] </#if><c:out value="@@{result.nttSj}"/>
								<c:if test="@@{result.deleteAt eq 'Y'}"></del></c:if>
							</em>
						</div>
						<div class="p-author__info">
							<time class="p-split"><c:out value="@@{result.frstRegisterPnttmYMD}"/></time>
							<span class="p-split"><em class="skip">조회 :</em> <svg width="20" height="16" class="p-icon" fill="#959595" focusable="false" y="-2"><use xlink:href="/common/images/program/p-icon.svg#eye"></use></svg><fmt:formatNumber value="@@{tsu:xssNumberFilter(result.rdcnt)}" pattern="#,###"/></span>
						</div>
					</div>
				</a>
			</li>
		</c:forEach>
		</ul>
	</div>
	
	</c:when>
	<c:otherwise>
	
	<div class="bbs_gallery bbs_empty">
		등록된 사진이 없습니다.
	</div>
	
	</c:otherwise>
	</c:choose>
	
	<div class="p-pagination">
		<div class="p-page">
			<c:url var="paginationUrl" value="./selectBbsNttList.do">
				<c:param name="key" value="@@{key}"/>
				<c:param name="bbsNo" value="@@{bbsNo}"/>
				<c:param name="searchCtgry" value="@@{bbsNttVO.searchCtgry}"/>
				<c:param name="searchCnd" value="@@{bbsNttVO.searchCnd}" />
				<c:param name="searchKrwd" value="@@{bbsNttVO.searchKrwd}" />
				<c:param name="integrDeptCode" value="@@{bbsNttVO.integrDeptCode}"/>
				<c:param name="pageIndex" value=""/>
			</c:url>
			<ui:pagination paginationInfo="@@{tsu:xssPagingFilter(paginationInfo)}" type="board" jsFunction="@@{tsu:htmlSpecialChars(paginationUrl)}" />
		</div>
	</div>
	
	<div class="text_right">
	<c:if test="@@{bbsAuthor.addBtnAuth}">
		<c:url var="writeUrl" value="./addBbsNttView.do">
			<c:param name="key" value="@@{key}"/>
			<c:param name="bbsNo" value="@@{bbsNo}"/>
			<c:param name="integrDeptCode" value="@@{bbsNttVO.integrDeptCode}"/>
		</c:url>
		<a href="<c:out value="@@{writeUrl}"/>" class="p-button write">글 쓰기</a>
	</c:if>
	</div>
	
</#if>

<#if bbsDescription.listLptDcReplcAt = 'N'>
	${bbsDescription.listLptDc!""}
<#else>
<c:if test="@@{isExistCntntsFile}">
	<c:set var="contentsFile" value="/repository/@@{menuInfo.siteId}/contents/@@{key}.html"/>
	<c:import var="Content" url="@@{contentsFile}" charEncoding="UTF-8" />
	<c:out value="@@{Content}" escapeXml="false" />
</c:if>
</#if>

</div>

</body>
</html>
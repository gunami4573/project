<c:if test="@@{result.fileExtsn eq 'jpg' || result.fileExtsn eq 'jpeg' || result.fileExtsn eq 'gif' || result.fileExtsn eq 'png' }">
    <div class="p-media__image">
        <div class="p-media__image-wrap">
            <img src="<c:out value="@@{result.storePath}"/>/thumb/t_<c:out value="@@{result.storeFileNm}"/>" alt="<c:out value="@@{bbsNtt.nttSj}"/> 이미지" />
        </div>
        <div class="p-icon-group">
            <c:if test="@@{result.newIcon}"><span class="p-icon p-icon__new">새글</span></c:if>
            <c:if test="@@{result.coolIcon}"><span class="p-icon p-icon__hot-bg">핫이슈</span></c:if>
        </div>
    </div>
</c:if>
<c:if test="@@{result.fileExtsn ne 'jpg' && result.fileExtsn ne 'jpeg' && result.fileExtsn ne 'gif' && result.fileExtsn ne 'png' }">
    <div class="p-media__image">
        <div class="p-media__image-wrap no-image">
            <em>이미지 준비중</em>
        </div>
        <div class="p-icon-group">
            <c:if test="@@{result.newIcon}"><span class="p-icon p-icon__new">새글</span></c:if>
            <c:if test="@@{result.coolIcon}"><span class="p-icon p-icon__hot-bg">핫이슈</span></c:if>
        </div>
    </div>
</c:if>
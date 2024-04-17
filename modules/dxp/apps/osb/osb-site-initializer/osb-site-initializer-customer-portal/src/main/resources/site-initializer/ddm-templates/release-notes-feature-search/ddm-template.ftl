<style>
	.empty-container {
		background-color: var(--color-neutral-0);
		border-color: var(--color-neutral-3);
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 0.0625rem;
		margin-top: 1.5rem;
		padding: 1.5rem 1.5rem 0.0625rem 1.5rem;
	}

	.empty-message-title {
		color: var(--color-neutral-10, #282934);
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.25rem;
	}

	.empty-result-message {
		align-items: center;
		margin: 5rem auto;
	}

	.features-container {
		background-color: var(--color-brand-primary-lighten-6, #FBFCFE);
		border: 0.0625rem solid var(--color-brand-primary-lighten-5, #E7EFFF);
		border-radius: 0.625rem;
		padding: 0.75rem;
	}

	.features-container>svg {
		fill: #0B5FFF;
		height: 0.75rem;
		width: 0.75rem;
	}

	.features-container a {
		text-decoration: none;
	}

	.features-container span {
		padding-left: 0.5rem;
	}

	.features-header {
		color: var(--color-neutral-8, #54555F);
		font-size: 0.813rem;
		margin-bottom: 0.5rem;
	}

	.icon-container {
		background-color: #E7EFFF;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		max-width: 9rem;
	}

	.pagination-bar {
		align-items: flex-start;
		display: flex;
		gap: 1rem;
	}

	.pagination-bar .dropdown.pagination-items-per-page {
		align-items: flex-start;
		display: flex;
	}

	.pagination-bar .dropdown.pagination-items-per-page .dropdown-toggle.page-link {
		align-items: center;
		border-width: 0rem;
		color: var(--color-action-neutral-default, #2B3A4B);
		display: flex;
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.875rem;
		font-style: normal;
		font-weight: 600;
		gap: 0.25rem;
		justify-content: center;
		line-height: 1rem;
		text-align: center;
	}

	.pagination-bar .dropdown.pagination-items-per-page .dropdown-toggle.page-link .c-inner {
		align-items: center;
		display: flex;
		height: 1rem;
		justify-content: center;
	}

	.pagination-bar .dropdown.pagination-items-per-page .dropdown-toggle.page-link .c-inner .lexicon-icon.lexicon-icon-caret-double-l {
		align-items: center;
		display: flex;
		flex-shrink: 0;
		height: 1rem;
		justify-content: center;
		width: 1rem;
	}

	.pagination-bar .pagination {
		align-items: flex-start;
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.pagination-bar .pagination .page-item .page-link {
		align-items: center;
		border-radius: 0.375rem;
		border-width: 0rem;
		color: var(--color-action-neutral-default, #2B3A4B);
		display: flex;
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.875rem;
		font-style: normal;
		font-weight: 600;
		gap: 0.25rem;
		justify-content: center;
		line-height: 1rem;
		min-width: 2rem;
		padding: 0.5rem;
		text-align: center;
	}

	.pagination-bar .pagination .page-item.active .page-link {
		background: var(--color-action-neutral-active-20, #D5D8DB);
	}

	.pagination-bar .pagination-results {
		align-items: flex-start;
		color: var(--color-neutral-10, #282934);
		display: flex;
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.8125rem;
		font-style: normal;
		font-weight: 400;
		gap: 0.25rem;
		line-height: 1rem;
		margin-top: 0.5rem;
	}

	.search-icon>svg {
		fill: #0B5FFF;
		height: 2rem;
		margin: 1.5rem 3.5rem;
		width: 2rem;
	}

	.search-results .search-results-entry {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.search-results .search-results-entry .search-results-entry-title {
		color: var(--color-neutral-10, #282934);
		border-radius: 0.625rem;
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 1.125rem;
		font-style: normal;
		font-weight: 600 !important;
		line-height: 1.5rem;
		padding: 1rem 1rem 1rem 0.625rem;
	}

	.search-results .search-results-entry .search-results-entry-title .search-results-entry-content {
		color: var(--color-neutral-10, #282934);
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 1rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.5rem;
		margin-top: 1rem;
	}

	.search-results .search-results-entry .search-results-entry-title:hover {
		   background: var(--color-action-primary-hover-10, #EDF3FE);
	}

	.search-results .solid {
		   border-top: 0.0625rem solid var(--color-neutral-2, #E2E2E4);
	}

	.label-x{
		background-color: var(--color-neutral-2, #E1E1E4);
		color: var(--color-neutral-7, #6C6C76);
		padding-bottom: 3px;
		text-decoration: line-through;
	}

	 .collapse-container {
		position: relative;
	}

	.collapse-container .tooltip {
		width: 140px;
		margin-top: -120px;
		transform: translateX(-40%);
	}

	.btn-x {
		background-color: var(--btn-default-background-color);
		border-color: var(--btn-default-border-color);
		border-width: var(--btn-border-width);
		color: var(--btn-default-color);
		cursor: pointer;
		--btn-default-border-color: transparent;
		font-family: inherit;
		font-size: unset;
		line-height: normal;
		margin: 1px;
		padding: 1px;
	}

	.tooltip-inner{
		color: var(--link-hover-color, #0b5fff);
		font-weight: var(--font-weight-bold, 700) !important;
	}

	.tooltip-inner a:hover, a.hover {
		color: var(--link-hover-color , #0b5fff);
		font-weight: var(--font-weight-bold, 700) !important;
}
</style>

<div class="pt-3 search-results" id="searchResults">
	<#if entries?has_content>
		<#list entries as searchEntry>
			<#assign
				searchEntryTitle=searchEntry.getTitle()!""
				restArticle=restClient.get("/headless-delivery/v1.0/structured-contents/${searchEntry.getClassPK()}?fields=contentFields,relatedContents,taxonomyCategoryBriefs&nestedFields=embeddedTaxonomyCategory") />
			<#if searchEntryTitle?has_content>
				<div class="align-items-stretch search-results-entry">
					<div
						aria-controls="collapsePanel${searchEntry.getClassPK()}"
						aria-expanded="false"
						class="align-items-center btn btn-unstyled collapse-icon collapse-icon-middle collapsed d-flex font-weight-bold p-3 panel-header panel-header-link search-results-entry-title text-decoration-none unstyled"
						data-target="#collapsePanel${searchEntry.getClassPK()}"
						data-toggle="liferay-collapse">

						<span class="mr-5">${searchEntryTitle}</span>
						<span class="ml-auto mr-5">
							<#list restArticle.taxonomyCategoryBriefs as taxonomyCategoryBrief>
								<#assign
									taxonomyVocabularyName=taxonomyCategoryBrief.embeddedTaxonomyCategory.parentTaxonomyVocabulary.name />

								<#if taxonomyVocabularyName=="Product Capabilities">
									<span
										class="font-weight-normal label label-secondary label-tonal-info m-0 px-2 text-paragraph-sm">
										${taxonomyCategoryBrief.taxonomyCategoryName}
									</span>
								</#if>
							</#list>
						</span>
						<span class="collapse-icon-closed">
							<@clay.icon symbol="angle-right" />
						</span>
						<span class="collapse-icon-open">
							<@clay.icon symbol="angle-down" />
						</span>
					</div>

					<div class="collapse collapse-container panel-collapse pl-3 pr-3" id="collapsePanel${searchEntry.getClassPK()}">
						<div class="description search-results-entry-content">
							<#list restArticle.contentFields as fieldData>
								<#if fieldData.contentFieldValue.data?has_content>
									<#assign webContentData = fieldData.contentFieldValue.data />

									<div>${webContentData}</div>
								</#if>
							</#list>
						</div>

						<#if restArticle.relatedContents?has_content>
							<div>
								<div class="features-header">${languageUtil.get(locale, "features", "Features")}:</div>

								<#list restArticle.relatedContents as relatedContents>
									<#assign relatedContentsId = relatedContents.id
										relatedContentsTitle=relatedContents.title />

									<div class="mb-3">
										<div class="features-container">
											<@clay["icon"] symbol="check-square" />

											<span>
												${relatedContentsTitle}
											</span>
										</div>
									</div>
								</#list>
							</div>
						</#if>

						<span class="ml-auto mr-5">
							<#list restArticle.taxonomyCategoryBriefs as taxonomyCategoryBrief>
								<#assign
									taxonomyVocabularyName=taxonomyCategoryBrief.embeddedTaxonomyCategory.parentTaxonomyVocabulary.name />

								<#if taxonomyVocabularyName=="Release Status Previous">
									<span
										class="font-weight-normal label label-secondary label-tonal-secondary label-x px-2 text-paragraph-sm">
										${taxonomyCategoryBrief.taxonomyCategoryName}
										<span class="pl-1">
											<@clay["icon"] symbol="info-circle" />
										</span>
									</span>
									<span class="mr-1"><@clay["icon"] symbol="order-arrow-right" /></span>
								</#if>
							</#list>

							<#list restArticle.taxonomyCategoryBriefs as taxonomyCategoryBrief>
								<#assign
									taxonomyVocabularyName=taxonomyCategoryBrief.embeddedTaxonomyCategory.parentTaxonomyVocabulary.name />

								 <#if taxonomyVocabularyName == "Release Status Current">

										<span class="font-weight-normal label label-success label-tonal-success mb-3 px-2 text-paragraph-sm">
												${taxonomyCategoryBrief.taxonomyCategoryName}
												<span class="pl-1">
														<button class="btn-x tooltip-button" data-tooltip-id="id${searchEntry.getClassPK()}" type="button">
																<@clay["icon"] symbol="info-circle" />

															<div class="clay-tooltip-top fade tooltip" id="id${searchEntry.getClassPK()}" role="tooltip">
																	<div class="arrow"></div>
																	<div class="tooltip-inner">
																				<a href="https://learn.liferay.com/en/w/dxp/system-administration/configuring-liferay/feature-flags#beta-features-and-feature-flags" target="_blank" rel="noopener noreferrer">Learn about the feature availability statuses</a>
																	</div>
															</div>
														</button>
												</span>
										</span>
								</#if>
							</#list>
						</span>
					</div>
				</div>

				<hr class="solid">
			</#if>
		</#list>

		<#else>
			<div class="empty-container">
				<div class="d-flex empty-result-message flex-column">
					<div class="icon-container">
						<div class="search-icon">
							<@clay["icon"] symbol="search-experiences" />
						</div>
					</div>

					<h1 class="empty-message-title text-center">${languageUtil.get(locale,
						"no-highlights-found-for-the-selected-product-capabilities", "No highlights found for the selected product capabilities.")}</h1>
				</div>
			</div>
	</#if>
</div>

<script>
	 document.addEventListener("DOMContentLoaded", function() {
		var buttons = document.querySelectorAll(".tooltip-button");

		buttons.forEach(function(button) {
			button.addEventListener("click", function(event) {
				let tooltipId = button.dataset.tooltipId;
				let tooltip = document.getElementById(tooltipId);
				if (tooltip) {
					tooltip.classList.toggle("show");
				}
			});
		});

		document.addEventListener("click", function(event) {
			if (!event.target.classList.contains("tooltip-button")) {
				let tooltips = document.querySelectorAll(".tooltip.show");
				tooltips.forEach(function(tooltip) {
					tooltip.classList.remove("show");
				});
			}
		});
	});
</script>
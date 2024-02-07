import { UmbLanguageWorkspaceContext } from './language-workspace.context.js';
import { UmbLanguageWorkspaceEditorElement } from './language-workspace-editor.element.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import type { UmbRoute } from '@umbraco-cms/backoffice/router';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbWorkspaceIsNewRedirectController } from '@umbraco-cms/backoffice/workspace';

@customElement('umb-language-workspace')
export class UmbLanguageWorkspaceElement extends UmbLitElement {
	#languageWorkspaceContext = new UmbLanguageWorkspaceContext(this);
	#createElement = () => new UmbLanguageWorkspaceEditorElement();

	@state()
	_routes: UmbRoute[] = [
		{
			path: 'edit/:unique',
			component: this.#createElement,
			setup: (_component, info) => {
				this.removeControllerByAlias('_observeIsNew');
				this.#languageWorkspaceContext.load(info.match.params.unique);
			},
		},
		{
			path: 'create',
			component: this.#createElement,
			setup: async () => {
				this.#languageWorkspaceContext.create();

				new UmbWorkspaceIsNewRedirectController(
					this,
					this.#languageWorkspaceContext,
					this.shadowRoot!.querySelector('umb-router-slot')!,
				);
			},
		},
	];

	render() {
		return html`<umb-router-slot .routes=${this._routes}></umb-router-slot>`;
	}

	static styles = [UmbTextStyles, css``];
}

export default UmbLanguageWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-language-workspace': UmbLanguageWorkspaceElement;
	}
}
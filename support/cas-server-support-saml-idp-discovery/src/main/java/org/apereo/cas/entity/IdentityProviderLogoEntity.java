package org.apereo.cas.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * This is {@link IdentityProviderLogoEntity}.
 *
 * @author Misagh Moayyed
 * @since 6.1.0
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class IdentityProviderLogoEntity extends IdentityProviderBasicEntity {
    private static final long serialVersionUID = -3901349236417720095L;

    private String height;

    private String width;
}

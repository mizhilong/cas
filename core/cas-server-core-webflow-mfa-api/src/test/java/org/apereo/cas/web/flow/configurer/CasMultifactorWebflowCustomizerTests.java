package org.apereo.cas.web.flow.configurer;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.springframework.core.Ordered;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * This is {@link CasMultifactorWebflowCustomizerTests}.
 *
 * @author Misagh Moayyed
 * @since 6.3.0
 */
public class CasMultifactorWebflowCustomizerTests {

    @Test
    public void verifyOperation() {
        val input = mock(CasMultifactorWebflowCustomizer.class);
        when(input.getCandidateStatesForMultifactorAuthentication()).thenCallRealMethod();
        when(input.getOrder()).thenCallRealMethod();
        assertTrue(input.getCandidateStatesForMultifactorAuthentication().isEmpty());
        assertEquals(Ordered.LOWEST_PRECEDENCE, input.getOrder());
    }

}

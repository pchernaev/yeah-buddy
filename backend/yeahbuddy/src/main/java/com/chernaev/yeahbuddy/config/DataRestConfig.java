package com.chernaev.yeahbuddy.config;

import com.chernaev.yeahbuddy.model.entity.Food;
import com.chernaev.yeahbuddy.model.entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigins = "http://localhoast:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config
            , CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {
            HttpMethod.POST,
            HttpMethod.PATCH,
            HttpMethod.DELETE,
            HttpMethod.PUT
        };

        config.exposeIdsFor(Food.class);

        disableHttpMethods(Food.class, config, unsupportedActions);
//        disableHttpMethods(User.class, config, unsupportedActions);

        //Configure CORS Mapping
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions)));
    }
}

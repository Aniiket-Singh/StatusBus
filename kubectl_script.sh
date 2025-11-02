gcloud compute ssh k8s-control-plane --zone asia-south2-a \
    -- -N -L 8443:127.0.0.1:6443
